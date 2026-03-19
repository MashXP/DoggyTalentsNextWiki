import json
import os
import urllib.request
import urllib.parse
import time

RECIPES_PATH = os.path.join(os.path.dirname(__file__), '../data/recipes.json')
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '../public/images/mcwikipull')

if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)

def fetch_json(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'DTN-Wiki-Bot/1.0'})
    with urllib.request.urlopen(req) as response:
        return json.loads(response.read().decode())

def download_file(url, dest):
    req = urllib.request.Request(url, headers={'User-Agent': 'DTN-Wiki-Bot/1.0'})
    with urllib.request.urlopen(req) as response:
        with open(dest, 'wb') as f:
            f.write(response.read())

def id_to_wiki_title(item_id):
    mapping = {
        'elytra': 'Elytra',
        'potion': 'Water_Bottle_JE2_BE2',
        'cooked_beef': 'Steak',
        'leather_helmet': 'Leather_Cap',
        'slime_ball': 'Slimeball',
        'redstone_block': 'Block_of_Redstone',
        'oak_log': 'Oak_Log',
        'oak_fence': 'Oak_Fence',
        'oak_slab': 'Oak_Slab',
        'poppy': 'Poppy',
        'dandelion': 'Dandelion',
        'white_wool': 'White_Wool',
        'white_carpet': 'White_Carpet'
    }
    
    if item_id in mapping:
        return f"File:{mapping[item_id]}.png"
    
    title = '_'.join(word.capitalize() for word in item_id.split('_'))
    return f"File:{title}.png"

def search_wiki_title(item_id):
    query = f"File:{item_id.replace('_', ' ')}"
    url = f"https://minecraft.wiki/api.php?action=query&list=search&srsearch={urllib.parse.quote(query)}&srnamespace=6&format=json"
    try:
        data = fetch_json(url)
        search_results = data.get('query', {}).get('search', [])
        if search_results:
            # Prefer titles that start with the exact name
            prefix = f"File:{item_id.replace('_', ' ')}"
            for result in search_results:
                if result['title'].lower().startswith(prefix.lower()):
                    return result['title']
            return search_results[0]['title']
    except Exception as e:
        print(f"Search failed for {item_id}: {e}")
    return None

def main():
    with open(RECIPES_PATH, 'r') as f:
        recipes = json.load(f)
    
    ids = set()
    
    def collect_id(item_id):
        if not item_id:
            return
        if item_id.startswith('minecraft:'):
            ids.add(item_id.split(':')[1])
        elif item_id.startswith('tag:'):
            tag_name = item_id.split(':')[1]
            tag_mappings = {
                'fences': 'oak_fence',
                'flowers': 'poppy',
                'logs': 'oak_log',
                'slabs': 'oak_slab',
                'wool': 'white_wool',
                'wool_carpets': 'white_carpet'
            }
            if tag_name in tag_mappings:
                ids.add(tag_mappings[tag_name])
            
    for recipe in recipes.values():
        if 'key' in recipe:
            for val in recipe['key'].values():
                collect_id(val)
        if 'ingredients' in recipe:
            for val in recipe['ingredients']:
                collect_id(val)
        if 'input' in recipe:
            collect_id(recipe['input'])
        if 'output' in recipe:
            collect_id(recipe['output'].get('item'))
            
    id_list = sorted(list(ids))
    print(f"Found {len(id_list)} unique Minecraft items.")
    
    for item_id in id_list:
        # Try direct mapping first
        title = id_to_wiki_title(item_id)
        print(f"Processing {item_id}...")
        
        url = f"https://minecraft.wiki/api.php?action=query&titles={urllib.parse.quote(title)}&prop=imageinfo&iiprop=url&format=json&redirects=1"
        data = fetch_json(url)
        
        # Handle Redirects Map
        redirect_map = {}
        if 'query' in data and 'redirects' in data['query']:
            for r in data['query']['redirects']:
                redirect_map[r['to'].replace(' ', '_').lower()] = r['from'].replace(' ', '_').lower()

        pages = data.get('query', {}).get('pages', {})
        page = next(iter(pages.values()))
        
        # Determine if we have a valid imageinfo
        if 'imageinfo' not in page or len(page['imageinfo']) == 0:
            print(f"Direct mapping/redirect failed for {item_id}, searching...")
            new_title = search_wiki_title(item_id)
            if new_title:
                title = new_title
                url = f"https://minecraft.wiki/api.php?action=query&titles={urllib.parse.quote(title)}&prop=imageinfo&iiprop=url&format=json&redirects=1"
                data = fetch_json(url)
                pages = data.get('query', {}).get('pages', {})
                page = next(iter(pages.values()))
        
        if 'imageinfo' in page and len(page['imageinfo']) > 0:
            image_url = page['imageinfo'][0]['url']
            if 'no-image' in image_url.lower() or 'missing' in image_url.lower():
                print(f"Skipping placeholder for {item_id}")
                continue
                
            dest = os.path.join(OUTPUT_DIR, f"{item_id}.png")
            print(f"Downloading {item_id} from {page.get('title')}...")
            try:
                download_file(image_url, dest)
            except Exception as e:
                print(f"Failed to download {item_id}: {e}")
        else:
            print(f"Could not find image for {item_id}")
        
        # Be nice to the wiki
        time.sleep(0.1)

if __name__ == "__main__":
    main()
