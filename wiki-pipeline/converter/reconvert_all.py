import os
import subprocess

CONTENT_DIR = "src/content/Main"
WIKI_DIR = "pages/Main"

def find_wiki_file(md_name):
    wiki_name = md_name.replace('_', ' ') + ".wiki"
    wiki_path = os.path.join(WIKI_DIR, wiki_name)
    if os.path.exists(wiki_path):
        return wiki_path
    
    # Try with underscores if space fails (some files might have underscores in pages/Main)
    wiki_name_underscore = md_name + ".wiki"
    wiki_path = os.path.join(WIKI_DIR, wiki_name_underscore)
    if os.path.exists(wiki_path):
        return wiki_path
        
    return None

for root, dirs, files in os.walk(CONTENT_DIR):
    for f in files:
        if f.endswith(".md"):
            md_path = os.path.join(root, f)
            md_name = os.path.splitext(f)[0]
            
            wiki_path = find_wiki_file(md_name)
            if wiki_path:
                print(f"Converting {wiki_path} -> {md_path}")
                subprocess.run(["python", "scripts/expand_wiki.py", wiki_path, md_path], check=True)
            else:
                print(f"Warning: Could not find wiki source for {md_path}")
