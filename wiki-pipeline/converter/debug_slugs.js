const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDirectory = path.join(process.cwd(), 'src/content/Main');

function getAllPageSlugs() {
  if (!fs.existsSync(contentDirectory)) return [];
  
  let slugs = [];
  
  const readDirRecursive = (dir, currentPath = '') => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory()) {
        readDirRecursive(path.join(dir, entry.name), path.join(currentPath, entry.name));
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const slug = path.join(currentPath, entry.name.replace(/\.md$/, ''));
        slugs.push(slug);
      }
    }
  };
  
  readDirRecursive(contentDirectory);
  return slugs;
}

const slugs = getAllPageSlugs();
console.log(JSON.stringify(slugs, null, 2));
