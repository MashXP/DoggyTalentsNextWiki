import json
import os

RECIPES_PATH = os.path.join(os.path.dirname(__file__), '../data/recipes.json')
OUTPUT_PATH = os.path.join(os.path.dirname(__file__), '../data/item_textures.json')

def get_item_name(item_id):
    if not item_id:
        return ""
    name = item_id.split(':')[1] if ':' in item_id else item_id
    return ' '.join(word.capitalize() for word in name.split('_'))

def get_item_texture(item_id):
    if not item_id:
        return ""
    
    namespace, name = item_id.split(':') if ':' in item_id else ('minecraft', item_id)
    
    if namespace == 'doggytalents':
        return f"/images/{name}.png"
    
    if namespace == 'minecraft':
        return f"/images/mcwikipull/{name}.png"
    
    if namespace == 'tag':
        return f"/images/mcwikipull/{name}.png"
    
    return ""

def main():
    if not os.path.exists(RECIPES_PATH):
        print(f"Error: {RECIPES_PATH} not found.")
        return

    with open(RECIPES_PATH, 'r') as f:
        recipes = json.load(f)

    all_ids = set()
    
    def collect_id(item_id):
        if item_id:
            all_ids.add(item_id)
            
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
            
    texture_mapping = {}
    for item_id in sorted(list(all_ids)):
        texture_mapping[item_id] = {
            "texture": get_item_texture(item_id),
            "name": get_item_name(item_id)
        }
        
    with open(OUTPUT_PATH, 'w') as f:
        json.dump(texture_mapping, f, indent=2)
        
    print(f"Generated {len(texture_mapping)} texture mappings → {OUTPUT_PATH}")

if __name__ == "__main__":
    main()
