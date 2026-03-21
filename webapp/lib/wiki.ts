import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// process.cwd() is the root of the next.js app, which is Wiki/src
const contentDirectory = path.join(process.cwd(), 'content/Main');

export interface WikiPage {
  slug: string; // The canonical hierarchical slug
  title: string;
  content: string;
  description?: string;
  infobox?: any;
  recipes?: Record<string, any>;
}

export interface SearchItem {
  title: string;
  slug: string;
  category?: string;
  content?: string;
}

export function getAllPageSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) return [];
  
  const slugs: string[] = [];
  const seenFlatSlugs = new Set<string>();
  
  const readDirRecursive = (dir: string, currentPath: string = '') => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory()) {
        readDirRecursive(path.join(dir, entry.name), path.join(currentPath, entry.name));
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const fileName = entry.name.replace(/\.md$/, '');
        const parentDirName = path.basename(currentPath);
        
        let slug;
        if (fileName.toLowerCase() === parentDirName.toLowerCase()) {
          // It's an index file for the folder (e.g., Items/Items.md)
          slug = currentPath;
        } else {
          slug = path.join(currentPath, fileName);
        }
        
        slugs.push(slug);
        
        // Also emit a flat slug alias (just the filename) so that links
        // like [Amnesia Bone](Amnesia_Bone) resolve without the full path.
        // Only emit if no conflict with another page that has the same filename.
        const flatSlug = fileName;
        if (!seenFlatSlugs.has(flatSlug.toLowerCase()) && slug !== flatSlug) {
          seenFlatSlugs.add(flatSlug.toLowerCase());
          slugs.push(flatSlug);
        }
      }
    }
  };
  
  readDirRecursive(contentDirectory);
  return slugs;
}

// Nav-only slugs: canonical full paths only, no flat aliases. Used by Sidebar.
export function getNavSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) return [];
  const slugs: string[] = [];
  const readDirRecursive = (dir: string, currentPath: string = '') => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        readDirRecursive(path.join(dir, entry.name), path.join(currentPath, entry.name));
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const fileName = entry.name.replace(/\.md$/, '');
        const parentDirName = path.basename(currentPath);
        const slug = fileName.toLowerCase() === parentDirName.toLowerCase()
          ? currentPath
          : path.join(currentPath, fileName);
        slugs.push(slug);
      }
    }
  };
  readDirRecursive(contentDirectory);
  return slugs;
}

export function getPageBySlug(slug: string): WikiPage | null {
  const decodedSlug = decodeURIComponent(slug);
  const normalizedRequested = decodedSlug.replace(/ /g, '_').toLowerCase();

  // 1. Direct match check
  let physicalPath = path.join(contentDirectory, `${decodedSlug}.md`);
  let canonicalSlug = decodedSlug;

  if (!fs.existsSync(physicalPath)) {
    // 2. Search for the file
    physicalPath = '';
    
    const searchFile = (dir: string, currentPath: string = '') => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory()) {
          searchFile(path.join(dir, entry.name), path.join(currentPath, entry.name));
          if (physicalPath) return;
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
          const fileName = entry.name.replace(/\.md$/, '');
          const parentDirName = path.basename(currentPath);
          
          // Check if it matches hierarchical slug (e.g. "Items/Blocks/Dog_Bed")
          const fullSlug = path.join(currentPath, fileName).replace(/ /g, '_').toLowerCase();
          // Check if it matches index slug (e.g. "Items" matches "Items/Items.md")
          const indexSlug = (fileName.toLowerCase() === parentDirName.toLowerCase()) 
            ? currentPath.replace(/ /g, '_').toLowerCase() 
            : '';
          // Check if it matches flat slug (e.g. "Dog_Bed" matches "Items/Blocks/Dog_Bed.md")
          const flatSlug = fileName.toLowerCase();

          if (fullSlug === normalizedRequested || 
              (indexSlug && indexSlug === normalizedRequested) ||
              (!slug.includes('/') && flatSlug === normalizedRequested)) {
            physicalPath = path.join(dir, entry.name);
            canonicalSlug = (fileName.toLowerCase() === parentDirName.toLowerCase()) 
              ? currentPath 
              : path.join(currentPath, fileName);
            return;
          }
        }
      }
    };
    
    searchFile(contentDirectory);
    if (!physicalPath) return null;
  }

  const fileContents = fs.readFileSync(physicalPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Handle MediaWiki redirects: REDIRECT [[Target]]
  const redirectMatch = content.match(/^(1\.\s+)?REDIRECT\s+\[.*?\]\((.*?)\)/i) || 
                        content.match(/^#REDIRECT\s+\[\[(.*?)\]\]/i);
                        
  if (redirectMatch) {
    const targetSlug = redirectMatch[2] || redirectMatch[1];
    // Recursive call to get the target page, but avoid infinite loops
    console.log(`Redirecting from ${decodedSlug} to ${targetSlug}`);
    return getPageBySlug(targetSlug);
  }

  console.log(`DEBUG: Page ${decodedSlug} content length: ${content.length}`);
  if (content.length < 500) {
    console.log(`DEBUG: Page ${decodedSlug} content starts with: ${content.slice(0, 200)}`);
  }

  return {
    slug: canonicalSlug,
    title: data.title || decodedSlug.split('/').pop()?.replace(/_/g, ' ') || decodedSlug,
    content,
    description: data.description,
    infobox: data.infobox,
    recipes: data.recipes,
  };
}

export function getSearchData(): SearchItem[] {
  if (!fs.existsSync(contentDirectory)) return [];
  
  const items: SearchItem[] = [];
  
  const readDirRecursive = (dir: string, currentPath: string = '') => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory()) {
        readDirRecursive(path.join(dir, entry.name), path.join(currentPath, entry.name));
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const fileContents = fs.readFileSync(path.join(dir, entry.name), 'utf8');
        const { data, content } = matter(fileContents);
        const fileName = entry.name.replace(/\.md$/, '');
        const parentDirName = path.basename(currentPath);
        
        const slug = (fileName.toLowerCase() === parentDirName.toLowerCase())
          ? currentPath
          : path.join(currentPath, fileName);
          
        // Simple regex to strip basic markdown for search indexing
        const cleanContent = content
          .replace(/\[(.*?)\]\(.*?\)/g, '$1') // [text](url) -> text
          .replace(/#{1,6}\s+/g, '')         // # headers
          .replace(/(\*\*|__)(.*?)\1/g, '$2') // bold
          .replace(/(\*|_)(.*?)\1/g, '$2')    // italic
          .replace(/`{1,3}[\s\S]*?`{1,3}/g, '') // code blocks
          .replace(/<.*?>/g, '')              // html tags
          .slice(0, 500);                     // Limit content length for scaling
          
        items.push({
          title: data.title || fileName.replace(/_/g, ' '),
          slug: slug,
          category: currentPath.split('/')[0] || 'Main',
          content: cleanContent,
        });
      }
    }
  };
  
  readDirRecursive(contentDirectory);
  return items;
}

export interface ItemInfo {
  title: string;
  slug: string;
  image: string | null;
  type: string | null;
  id: string | null;
  recipes?: Record<string, any>;
}

let cachedItemsInfo: ItemInfo[] | null = null;

export function getAllItemsInfo(): ItemInfo[] {
  if (cachedItemsInfo) return cachedItemsInfo;
  if (!fs.existsSync(contentDirectory)) return [];
  
  const items: ItemInfo[] = [];
  
  const readDirRecursive = (dir: string, currentPath: string = '') => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory()) {
        readDirRecursive(path.join(dir, entry.name), path.join(currentPath, entry.name));
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const fileContents = fs.readFileSync(path.join(dir, entry.name), 'utf8');
        const { data } = matter(fileContents);
        const fileName = entry.name.replace(/\.md$/, '');
        const parentDirName = path.basename(currentPath);
        
        const slug = (fileName.toLowerCase() === parentDirName.toLowerCase())
          ? currentPath
          : path.join(currentPath, fileName);
          
        let itemType = null;
        let itemId = null;
        if (data.infobox && data.infobox.rows) {
          const typeRow = data.infobox.rows.find((row: any) => row.Type);
          if (typeRow) itemType = typeRow.Type;
          
          const idRow = data.infobox.rows.find((row: any) => row.ID);
          if (idRow) itemId = idRow.ID;
        }
        if (!itemType) {
          itemType = data.Type || data.type || null;
        }

        items.push({
          title: data.title || fileName.replace(/_/g, ' '),
          slug: slug,
          image: data.infobox?.image || data.image || null,
          type: itemType,
          id: itemId,
          recipes: data.recipes
        });
      }
    }
  };
  
  readDirRecursive(contentDirectory);
  cachedItemsInfo = items;
  return items;
}
