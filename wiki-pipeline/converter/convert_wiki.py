import os
import subprocess
import re

WIKI_DIR = "../fetcher/pages/Main"
OUT_DIR = "../../webapp/content/Main"

os.makedirs(OUT_DIR, exist_ok=True)

def pre_process(text):
    # Remove Category links
    text = re.sub(r'\[\[Category:.*?\]\]', '', text)
    # Remove magic words
    text = re.sub(r'__(NOTOC|NOEDITSECTION|NOTITLE)__', '', text)
    return text

def post_process(text):
    # Pandoc might convert [[Link]] to \[\[Link\]\] or leave it, or convert to [Link](Link)
    # Let's fix pandoc's \[\[Link\]\] if it happens, or handle standard links.
    # Actually, pandoc usually handles MediaWiki internal links fairly well if we use gfm: it translates [[Page]] to [Page](Page)
    
    # Let's fix some possible leftover formatting
    text = text.replace('\\[\\[', '[[').replace('\\]\\]', ']]')
    
    # Convert [[Link|Text]] to [Text](/Link) manually if pandoc missed it
    text = re.sub(r'\[\[(.*?)\|(.*?)\]\]', r'[\2](/\1)', text)
    # Convert [[Link]] to [Link](/Link)
    def repl(m):
        link = m.group(1)
        if link.startswith("File:") or link.startswith("Image:"):
            return f"![{link}](/images/{link.replace('File:', '').replace('Image:', '').split('|')[0]})"
        return f"[{link}](/{link.replace(' ', '_')})"
        
    text = re.sub(r'\[\[(.*?)\]\]', repl, text)

    return text

def convert():
    for filename in os.listdir(WIKI_DIR):
        if not filename.endswith(".wiki"):
            continue
            
        in_path = os.path.join(WIKI_DIR, filename)
        out_name = filename.replace(".wiki", ".md")
        out_path = os.path.join(OUT_DIR, out_name)
        
        with open(in_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        content = pre_process(content)
        
        # Write temporary file for pandoc
        tmp_in = "tmp_in.wiki"
        with open(tmp_in, "w", encoding="utf-8") as f:
            f.write(content)
            
        # Run pandoc
        try:
            result = subprocess.run(
                ["pandoc", "-f", "mediawiki", "-t", "gfm", tmp_in],
                capture_output=True, text=True, check=True
            )
            md_content = result.stdout
        except subprocess.CalledProcessError as e:
            print(f"Error converting {filename}: {e.stderr}")
            continue
            
        md_content = post_process(md_content)
        
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(md_content)
            
        print(f"Converted {filename} to {out_name}")
        
    if os.path.exists("tmp_in.wiki"):
        os.remove("tmp_in.wiki")

if __name__ == "__main__":
    convert()
