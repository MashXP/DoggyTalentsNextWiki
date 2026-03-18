import os
import re

CONTENT_DIR = "src/content/Main"

def sanitize_filename(filename):
    """Replaces spaces with underscores in filenames."""
    if " " in filename:
        return filename.replace(" ", "_")
    return filename

def process_links(content):
    """Finds markdown links and ensures they use underscores instead of spaces."""
    # Matches [text](/Link with spaces) -> [text](/Link_with_spaces)
    # We mainly need to target the href parts of markdown links.
    def replacer(match):
        text = match.group(1)
        href = match.group(2)
        
        # Don't touch external links, anchors, or relative image paths (unless they had spaces too)
        if href.startswith('http') or href.startswith('mailto:') or href.startswith('#'):
            return f"[{text}]({href})"
            
        # Replace spaces with underscores in link hrefs
        fixed_href = href.replace(" ", "_").replace("%20", "_")
        return f"[{text}]({fixed_href})"
        
    # Regex to find markdown links: [text](href)
    new_content = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', replacer, content)
    return new_content

def main():
    if not os.path.exists(CONTENT_DIR):
        print(f"Directory {CONTENT_DIR} not found.")
        return

    # First pass: read all files, process content, and rename
    for filename in os.listdir(CONTENT_DIR):
        if not filename.endswith(".md"):
            continue

        old_path = os.path.join(CONTENT_DIR, filename)
        new_filename = sanitize_filename(filename)
        new_path = os.path.join(CONTENT_DIR, new_filename)

        with open(old_path, 'r', encoding='utf-8') as f:
            content = f.read()

        updated_content = process_links(content)

        # Write to the new path
        with open(new_path, 'w', encoding='utf-8') as f:
            f.write(updated_content)

        # Remove old file if it was renamed
        if old_path != new_path:
            os.remove(old_path)
            print(f"Renamed and processed: {filename} -> {new_filename}")
        else:
            print(f"Processed: {filename}")

if __name__ == "__main__":
    main()
