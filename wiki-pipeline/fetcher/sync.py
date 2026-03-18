import pywikibot
import argparse
from pathlib import Path

PAGES_DIR = Path('pages')

def filepath_to_title(filepath):
    # Convert local path like "pages/Template/UI/Button.wiki" back to "Template:UI/Button"
    rel_path = filepath.relative_to(PAGES_DIR)
    parts = list(rel_path.parts)
    
    ns = parts.pop(0) # Extract the top-level folder (Namespace)
    parts[-1] = filepath.stem # Remove the '.wiki' extension
    
    title_body = '/'.join(parts) # Rejoin subpages with a slash
    
    if ns == 'Main':
        return title_body
    return f"{ns}:{title_body}"

def pull_all():
    print("⬇️ Pulling wiki into organized folders (Batched)...")
    site = pywikibot.Site()
    
    # Loop through all valid namespaces
    for ns_id in site.namespaces:
        if ns_id < 0: continue # Skip Special/Media namespaces
        
        # 1. Get the list of pages
        pages_to_download = site.allpages(namespace=ns_id)
        
        # 2. THE FIX: Wrap it in preloadpages() to fetch 50 at a time
        for page in site.preloadpages(pages_to_download):
            ns_name = "Main" if ns_id == 0 else page.namespace().custom_name
            title_no_ns = page.title(with_ns=False)
            
            # Create a clean folder path based on subpages
            path_parts = title_no_ns.split('/')
            file_path = PAGES_DIR.joinpath(ns_name, *path_parts).with_suffix('.wiki')
            
            # Automatically create the required folders
            file_path.parent.mkdir(parents=True, exist_ok=True)
            
            # Save the file (this no longer triggers a new API call!)
            file_path.write_text(page.text, encoding='utf-8')
            print(f"  Saved {file_path}")

    print("\n✅ Pull complete! Your workspace is organized.")

def push_all():
    print("⬆️ Scanning local folders for changes...")
    site = pywikibot.Site()
    
    if not PAGES_DIR.exists():
        print(f"Directory '{PAGES_DIR}' not found.")
        return

    # Recursively find every .wiki file in all subfolders
    for filepath in PAGES_DIR.rglob('*.wiki'):
        title = filepath_to_title(filepath)
        local_content = filepath.read_text(encoding='utf-8')
        
        page = pywikibot.Page(site, title)
        
        # Only upload if the text was actually modified
        if page.text != local_content:
            print(f"  ⬆️ Pushing updates for '{title}'...")
            page.text = local_content
            page.save(summary="Synced from local files")

    print("\n✅ Push complete! Only modified files were uploaded.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("command", choices=["pull", "push"])
    args = parser.parse_args()

    if args.command == "pull":
        pull_all()
    elif args.command == "push":
        push_all()