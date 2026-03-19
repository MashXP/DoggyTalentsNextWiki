import json
import os
import re

JAVA_PATH = os.path.join(os.path.dirname(__file__), '../ref/DTRecipeProvider.java')
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '../data')
OUTPUT_PATH = os.path.join(OUTPUT_DIR, 'recipes.json')

def resolve_item_id(java_ref):
    java_ref = java_ref.strip()
    
    # Vanilla Items.* or Blocks.*
    if java_ref.startswith('Items.'):
        name = java_ref.replace('Items.', '').lower()
        return f"minecraft:{name}"
    if java_ref.startswith('Blocks.'):
        name = java_ref.replace('Blocks.', '').lower()
        return f"minecraft:{name}"
        
    # DoggyItems.* or DoggyBlocks.*
    if java_ref.startswith('DoggyItems.'):
        name = java_ref.replace('DoggyItems.', '').replace('.get()', '').lower()
        return f"doggytalents:{name}"
    if java_ref.startswith('DoggyBlocks.'):
        name = java_ref.replace('DoggyBlocks.', '').replace('.get()', '').lower()
        return f"doggytalents:{name}"
        
    # Tags
    if java_ref.startswith('ItemTags.'):
        name = java_ref.replace('ItemTags.', '').lower()
        return f"tag:{name}"
    if java_ref.startswith('BlockTags.'):
        name = java_ref.replace('BlockTags.', '').lower()
        return f"tag:{name}"
        
    return f"unknown:{java_ref}"

def parse_recipes(java_source):
    recipes = {}
    
    # ===== SHAPED RECIPES =====
    shaped_regex = r'ShapedRecipeBuilder\.shaped\s*\(\s*RecipeCategory\.\w+,\s*([\w.()]+?)(?:\.get\(\))?\s*(?:,\s*(\d+))?\s*\)([\s\S]*?)\.save\s*\(\s*consumer\s*(?:,\s*[^)]+)?\s*\)'
    for match in re.finditer(shaped_regex, java_source):
        output_ref = match.group(1)
        count = int(match.group(2) or '1')
        body = match.group(3)
        
        # Patterns
        patterns = re.findall(r'\.pattern\s*\(\s*"([^"]{1,3})"\s*\)', body)
        padded_patterns = [p.ljust(3) for p in patterns]
        
        # Keys
        key = {}
        for char, ref in re.findall(r'\.define\s*\(\s*\'(\w)\'\s*,\s*([\w.()]+(?:\.get\(\))?)\s*\)', body):
            key[char] = resolve_item_id(ref)
            
        output_item = resolve_item_id(output_ref)
        recipe_id = output_item.split(':')[1] if ':' in output_item else output_item
        
        final_id = recipe_id
        if final_id in recipes:
            save_match = re.search(r'save\s*\(\s*consumer\s*,\s*Util\.getResource\s*\(\s*"([^"]+)"\s*\)\s*\)', match.group(0))
            if save_match:
                final_id = save_match.group(1)
            else:
                final_id = f"{recipe_id}_alt"
        
        recipes[final_id] = {
            "type": "shaped",
            "pattern": padded_patterns,
            "key": key,
            "output": {"item": output_item, "count": count}
        }

    # ===== SHAPELESS RECIPES =====
    shapeless_regex = r'ShapelessRecipeBuilder\.shapeless\s*\(\s*RecipeCategory\.\w+,\s*([\w.()]+?)(?:\.get\(\))?\s*(?:,\s*(\d+))?\s*\)([\s\S]*?)\.save\s*\(\s*consumer\s*(?:,\s*[^)]+)?\s*\)'
    for match in re.finditer(shapeless_regex, java_source):
        output_ref = match.group(1)
        count = int(match.group(2) or '1')
        body = match.group(3)
        
        ingredients = []
        for ref, qty in re.findall(r'\.requires\s*\(\s*([\w.()]+(?:\.get\(\))?)\s*(?:,\s*(\d+))?\s*\)', body):
            item_id = resolve_item_id(ref)
            count_ing = int(qty or '1')
            for _ in range(count_ing):
                ingredients.append(item_id)
                
        output_item = resolve_item_id(output_ref)
        recipe_id = output_item.split(':')[1] if ':' in output_item else output_item
        
        final_id = recipe_id
        if final_id in recipes:
            save_match = re.search(r'save\s*\(\s*consumer\s*,\s*Util\.getResource\s*\(\s*"([^"]+)"\s*\)\s*\)', match.group(0))
            if save_match:
                final_id = save_match.group(1)
            else:
                final_id = f"{recipe_id}_shapeless"
                
        recipes[final_id] = {
            "type": "shapeless",
            "ingredients": ingredients,
            "output": {"item": output_item, "count": count}
        }

    # ===== COOKING RECIPES =====
    cooking_regex = r'registerTripleCooking\s*\(\s*consumer\s*,\s*\n?\s*Ingredient\.of\s*\(\s*([\w.()]+(?:\.get\(\))?)\s*\)\s*,\s*\n?\s*([\w.()]+(?:\.get\(\))?)\s*,'
    for match in re.finditer(cooking_regex, java_source):
        input_item = resolve_item_id(match.group(1))
        output_item = resolve_item_id(match.group(2))
        recipe_id = output_item.split(':')[1] if ':' in output_item else output_item
        
        for suffix in ['_smelting', '_campfire', '_smoking']:
            recipes[f"{recipe_id}{suffix}"] = {
                "type": suffix[1:],
                "input": input_item,
                "output": {"item": output_item, "count": 1}
            }
            
    return recipes

def main():
    if not os.path.exists(JAVA_PATH):
        print(f"Error: Java file not found at {JAVA_PATH}")
        return

    with open(JAVA_PATH, 'r') as f:
        java_source = f.read()
        
    recipes = parse_recipes(java_source)
    
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
        
    with open(OUTPUT_PATH, 'w') as f:
        json.dump(recipes, f, indent=2)
        
    print(f"Parsed {len(recipes)} recipes -> {OUTPUT_PATH}")
    
    # Summary
    types = {}
    for r in recipes.values():
        t = r['type']
        types[t] = types.get(t, 0) + 1
    print("Recipe types:", types)

if __name__ == "__main__":
    main()
