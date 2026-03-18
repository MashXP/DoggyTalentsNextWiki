import json
import mwclient
import os

def pull_pages():
    # Read credentials from VS Code settings
    settings_path = ".vscode/settings.json"
    if not os.path.exists(settings_path):
        print(f"Error: {settings_path} not found.")
        return

    with open(settings_path, "r") as f:
        settings = json.load(f)

    host = settings.get("wikitext.host", "doggytalentsnext.wiki.gg")
    username = settings.get("wikitext.userName")
    password = settings.get("wikitext.password")

    if not username or not password:
        print("Error: Username or password missing in settings.json")
        return

    print(f"Connecting to {host}...")
    site = mwclient.Site(host, path="/")
    
    try:
        site.login(username, password)
        print("Login successful!")
    except Exception as e:
        print(f"Login failed: {e}")
        return

    # Create a 'pages' directory if it doesn't exist
    if not os.path.exists("pages"):
        os.makedirs("pages")

    print("Fetching all pages...")
    # This will get all pages in the main namespace (0)
    for page in site.allpages(namespace=0):
        # Clean the title for use as a filename
        safe_title = page.name.replace("/", "_").replace(":", "_").replace(" ", "_")
        filename = f"pages/{safe_title}.wiki"
        
        print(f"Downloading: {page.name}")
        with open(filename, "w", encoding="utf-8") as f:
            f.write(page.text())

    print("\nDone! All pages are in the 'pages/' folder.")

if __name__ == "__main__":
    pull_pages()
