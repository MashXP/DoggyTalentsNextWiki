import json
import mwclient
import os

def pull_assets():
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

    output_dir = "../../webapp/public/images"
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    print("Fetching all images/files...")
    for image in site.allimages():
        filename = image.name
        safe_filename = filename.replace(" ", "_")
        filepath = os.path.join(output_dir, safe_filename)
        
        if os.path.exists(filepath):
            print(f"Skipping (already exists): {safe_filename}")
            continue

        print(f"Downloading: {safe_filename}...")
        try:
            with open(filepath, "wb") as f:
                image.download(f)
        except Exception as e:
            print(f"Failed to download {safe_filename}: {e}")

    print(f"\nDone! All assets are in the '{output_dir}/' folder.")

if __name__ == "__main__":
    pull_assets()
