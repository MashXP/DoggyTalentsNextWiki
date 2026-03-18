import re
import os
import sys

# Mapping of icon names to actual filenames in src/public/images
# We'll do a case-insensitive search if it doesn't match directly.
IMAGE_DIR = "../../webapp/public/images"
image_files = os.listdir(IMAGE_DIR)

def find_image(icon_name):
    # Normalize input for comparison: lowercase, underscores/spaces removed
    def normalize(s):
        return re.sub(r'[\s_-]', '', s.lower())
    
    target_norm = normalize(os.path.splitext(icon_name)[0])
    
    for f in image_files:
        f_norm = normalize(os.path.splitext(f)[0])
        if f_norm == target_norm:
            return f
    return None

def expand_template(match):
    content = match.group(1)
    parts = content.split('|')
    
    main_args = []
    kwargs = {}
    for p in parts:
        if '=' in p:
            parts_kv = p.split('=', 1)
            kwargs[parts_kv[0].strip().lower()] = parts_kv[1].strip()
        else:
            main_args.append(p.strip())
            
    if len(main_args) >= 2:
        link = main_args[0]
        display = main_args[1]
    elif len(main_args) == 1:
        link = main_args[0]
        display = main_args[0]
    else:
        link = ""
        display = ""
        
    icon = kwargs.get('icon', '')
    img_tag = ""
    if icon:
        img_file = find_image(icon)
        if img_file:
            img_tag = f'<img src="/images/{img_file}" class="item-icon" />'
            
    md_link = link.replace(' ', '_')
    return f'<span class="item-link-wrapper">{img_tag}[{display}]({md_link})</span>'

def process_wiki(text, title=None):
    # Add frontmatter
    frontmatter = ""
    if title:
        frontmatter = f"---\ntitle: {title}\n---\n\n"
        
    # 1. Expand Templates
    def expand_item_template(m):
        content = m.group(1)
        params = {}
        # Multi-line match for params
        all_lines = re.findall(r'\|\s*([^=|\n]+?)\s*=\s*(.*?)(?=\s*\||\s*}}|\s*\n)', content + '\n', re.DOTALL)
        for k, v in all_lines:
            params[k.strip().lower()] = v.strip()
        
        name = params.get('name') or title or "Item"
        img = params.get('image') or ""
        item_id = params.get('id') or ""
        item_type = params.get('type') or ""
        subtype = params.get('subtype') or ""
        props = params.get('properties') or ""
        stack = params.get('stackable') or ""
        desc = params.get('description') or ""
        
        if img:
            img_file = find_image(img)
            if img_file: img = img_file
            img_html = f'<div class="infobox-image-wrapper"><img src="/images/{img}" alt="{name}" class="infobox-image" /></div>'
        else:
            img_html = ""
            
        rows = []
        if item_id: rows.append(f'<div class="infobox-row"><b>ID</b><span>{item_id}</span></div>')
        if item_type: 
            type_str = f"{item_type}" + (f" ({subtype})" if subtype else "")
            rows.append(f'<div class="infobox-row"><b>Type</b><span>{type_str}</span></div>')
        if props: rows.append(f'<div class="infobox-row"><b>Properties</b><span>{props}</span></div>')
        if stack: rows.append(f'<div class="infobox-row"><b>Stackable</b><span>{stack}</span></div>')
        
        return f"""
<aside class="infobox glass">
  <div class="infobox-title">{name}</div>
  {img_html}
  <div class="infobox-content">
    {"".join(rows)}
  </div>
  {f'<div class="infobox-description">{desc}</div>' if desc else ''}
</aside>
"""

    # Fix: Use word boundary and negative lookahead to NOT match "Item with Sprite"
    text = re.sub(r'{{[iI]tem\b(?!\s*with\s*Sprite)\s*(.*?)}}', expand_item_template, text, flags=re.DOTALL)
    text = re.sub(r'{{[iI]tem with Sprite\|(.*?)}}', expand_template, text, flags=re.DOTALL)
    
    # Pre-clean: Replace column divs with a class for CSS grid
    text = re.sub(r'<div style="columns:.*?">', r'<div class="item-grid">', text, flags=re.IGNORECASE)

    # 2. Handle Files/Images (Robust)
    def handle_mediawiki_file(m):
        full_content = m.group(1)
        parts = [p.strip() for p in full_content.split('|')]
        filename = parts[0]
        
        img_file = find_image(filename)
        if img_file:
            filename = img_file
        else:
            filename = filename.replace(' ', '_')
            
        size = None
        caption = ""
        is_thumb = False
        
        for p in parts[1:]:
            if 'px' in p and any(c.isdigit() for c in p):
                size = p
            elif p == 'thumb':
                is_thumb = True
            elif p not in ['left', 'right', 'center', 'none'] and not p.startswith('link='):
                caption = p
        
        # Escape quotes in caption for title attribute
        safe_caption = caption.replace('"', '&quot;')
        title_attr = f' "{safe_caption}"' if safe_caption else ""
        
        # For thumbs, ensure they have a newline after if followed by text
        sep = "\n\n" if is_thumb else ""
        return f'{sep}![{caption}](/images/{filename}{title_attr}){sep}'

    text = re.sub(r'\[\[(?:File|Image):(.*?)\]\]', handle_mediawiki_file, text, flags=re.IGNORECASE)

    # 3. Handle Syntaxhighlight
    text = re.sub(r'<syntaxhighlight(.*?)>(.*?)</syntaxhighlight>', r'```\1\n\2\n```', text, flags=re.DOTALL)
    text = re.sub(r'``` lang="(.*?)"', r'```\1', text)
    text = re.sub(r'{{[cC]ode\|(.*?)}}', r'```\n\1\n```', text, flags=re.DOTALL)

    # 4. Handle Tables
    def convert_table(m):
        table_content = m.group(1).strip()
        md_table = []
        rows = table_content.split('|-')
        
        col_count = 0
        for i, block in enumerate(rows):
            block = block.strip()
            if not block: continue
            
            lines = block.split('\n')
            cells = []
            is_header = False
            
            for line in lines:
                line = line.strip()
                if not line: continue
                if line.startswith('!'):
                    is_header = True
                    content = line[1:].strip()
                    subcells = re.split(r'!!', content)
                    cells.extend([c.strip() for c in subcells if c.strip()])
                elif line.startswith('|'):
                    # Skip table attributes if first block
                    if not cells and '=' in line and i == 0: continue
                    content = line[1:].strip()
                    subcells = re.split(r'\|\|', content)
                    for c in subcells:
                        c = c.strip()
                        if not c: continue
                        if '|' in c: c = c.split('|')[-1].strip()
                        cells.append(c)
            
            if cells:
                if is_header:
                    md_table.append('| ' + ' | '.join(cells) + ' |')
                    if col_count == 0:
                        col_count = len(cells)
                        md_table.append('| ' + ' | '.join(['---'] * col_count) + ' |')
                else:
                    if col_count == 0: col_count = len(cells)
                    while len(cells) < col_count: cells.append("")
                    md_table.append('| ' + ' | '.join(cells[:col_count]) + ' |')
        
        return '\n\n' + '\n'.join(md_table) + '\n\n'

    text = re.sub(r'\{\|.*?\n(.*?)\n\|\}', convert_table, text, flags=re.DOTALL)

    # 5. Handle Blockquotes (Convert to Markdown to ensure nested content fits)
    def handle_blockquote(m):
        content = m.group(1).strip()
        # Pre-process content inside blockquote (handle images/links first if not already done)
        # But they are handled before this. 
        lines = content.split('\n')
        if not lines: return ""
        # Standardize blockquote prefixing with clean separations
        return '\n\n' + '\n'.join([f'> {line.strip()}' for line in lines]) + '\n\n'
    
    text = re.sub(r'<blockquote\s*>(.*?)</blockquote>', handle_blockquote, text, flags=re.DOTALL | re.IGNORECASE)

    # 6. General Links
    text = re.sub(r'\[\[(?!(?:File|Image):)([^\]|]+)\|([^\]]+)\]\]', r'[\2](\1)', text)
    text = re.sub(r'\[\[(?!(?:File|Image):)([^\]]+)\]\]', lambda m: f"[{m.group(1)}]({m.group(1).replace(' ', '_')})", text)
    
    # 7. Lists
    text = re.sub(r'^\*\*\*\s*', r'    - ', text, flags=re.MULTILINE)
    text = re.sub(r'^\*\*\s*', r'  - ', text, flags=re.MULTILINE)
    text = re.sub(r'^\*\s*', r'- ', text, flags=re.MULTILINE)
    text = re.sub(r'^###\s*', r'    1. ', text, flags=re.MULTILINE)
    text = re.sub(r'^##\s*', r'  1. ', text, flags=re.MULTILINE)
    text = re.sub(r'^#\s*', r'1. ', text, flags=re.MULTILINE)

    # 8. Bold/Italic (Run after lists!)
    text = re.sub(r"'''''(.*?)'''''", r'***\1***', text)
    text = re.sub(r"'''(.*?)'''", r'**\1**', text)
    text = re.sub(r"''(.*?)''", r'*\1*', text)
    
    # 9. Headers
    def handle_header(m):
        level = len(m.group(1))
        title_text = m.group(2).strip()
        return f"{'#' * level} {title_text}"
    text = re.sub(r'^(={2,5})(.*?)\1', handle_header, text, flags=re.MULTILINE)
    
    # 10. Extras: In-dev badges
    text = re.sub(r'\((in-dev|in-development|indev)\)', r'<span class="item-indev"></span>', text, flags=re.IGNORECASE)

    # 11. Clean up newlines
    text = re.sub(r'\n{3,}', '\n\n', text)
    
    return frontmatter + text

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python expand_wiki.py input.wiki output.md [Title]")
        sys.exit(1)
        
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    title = sys.argv[3] if len(sys.argv) > 3 else None
    
    if not title:
        title = os.path.splitext(os.path.basename(input_file))[0]
        
    with open(input_file, 'r') as f:
        wiki_text = f.read()
        
    md_text = process_wiki(wiki_text, title)
    
    with open(output_file, 'w') as f:
        f.write(md_text)
    print(f"Generated {output_file}")
