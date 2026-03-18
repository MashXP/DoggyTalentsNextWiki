import pywikibot
import os
import tqdm
from pathlib import Path

IMAGES_DIR = Path('../../webapp/public/images')

def pull_assets():
    print("⬇️ Pulling all images to webapp/public/images...")
    site = pywikibot.Site()
    
    if not IMAGES_DIR.exists():
        IMAGES_DIR.mkdir(parents=True, exist_ok=True)
    
    print("Fetching list of all images from the wiki... (This may take a moment)")
    # Convert generator to list so we get the total count
    all_images = list(site.allimages())
    
    # Filter out already existing images right away
    pending_images = []
    skipped_count = 0
    
    for file_page in all_images:
        filename = file_page.title(with_ns=False).replace(" ", "_")
        file_path = IMAGES_DIR / filename
        if file_path.exists():
            skipped_count += 1
        else:
            pending_images.append((file_page, filename, file_path))
            
    total_images = len(all_images)
    pending_count = len(pending_images)
    
    print(f"\nFound {total_images} total images.")
    print(f"Already downloaded: {skipped_count}")
    print(f"Pending download: {pending_count}\n")
    
    if pending_count == 0:
        print("✅ All images are already downloaded!")
        return

    # Process remaining
    for file_page, filename, file_path in tqdm.tqdm(pending_images, desc="Downloading Images", unit="img"):
        try:
            file_page.download(filename=str(file_path))
        except Exception as e:
            tqdm.tqdm.write(f"  ❌ Failed to download {filename}: {e}")

    print("\n✅ Pull complete!")

if __name__ == "__main__":
    pull_assets()
