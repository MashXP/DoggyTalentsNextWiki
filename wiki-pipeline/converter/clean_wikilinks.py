import os
import re

CONTENT_DIR = "src/content/Main"

def clean_wikilinks(content):
    """
    Pandoc often converts [[Link]] to [Link](Link_"wikilink") when parsing MediaWiki.
    We just want [Link](/Link).
    We already mapped spaces to underscores, so a link looks like:
    [Text](Href_"wikilink") or [Text](Href_(_wikilink_))
    """
    
    # regex to match any _"wikilink" or %20"wikilink" at the end of the href
    # Since we replaced spaces with underscores earlier, it mostly looks like `_"wikilink"`
    # e.g [Gender Bone](Gender_Bone_"wikilink") -> [Gender Bone](Gender_Bone)
    new_content = re.sub(r'_"wikilink"(\))', r'\1', content)
    new_content = re.sub(r'%20"wikilink"(\))', r'\1', new_content)
    new_content = re.sub(r' "wikilink"(\))', r'\1', new_content)

    return new_content

def main():
    if not os.path.exists(CONTENT_DIR):
        print(f"Directory {CONTENT_DIR} not found.")
        return

    count = 0
    for filename in os.listdir(CONTENT_DIR):
        if not filename.endswith(".md"):
            continue

        filepath = os.path.join(CONTENT_DIR, filename)

        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        updated_content = clean_wikilinks(content)

        if content != updated_content:
            count += 1
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(updated_content)
    
    print(f"Cleaned 'wikilink' artifacts from {count} files.")

if __name__ == "__main__":
    main()
