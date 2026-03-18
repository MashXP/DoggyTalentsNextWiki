/**
 * parse-recipes.ts
 * 
 * Parses DTRecipeProvider.java and extracts all crafting recipes into a JSON file.
 * Run with: npx tsx scripts/parse-recipes.ts
 */

import * as fs from 'fs';
import * as path from 'path';

interface ShapedRecipe {
  type: 'shaped';
  pattern: string[];
  key: { [char: string]: string };
  output: { item: string; count: number };
}

interface ShapelessRecipe {
  type: 'shapeless';
  ingredients: string[];
  output: { item: string; count: number };
}

interface CookingRecipe {
  type: 'smelting' | 'campfire' | 'smoking';
  input: string;
  output: { item: string; count: number };
}

type Recipe = ShapedRecipe | ShapelessRecipe | CookingRecipe;

// Map Java item references to namespaced IDs
function resolveItemId(javaRef: string): string {
  javaRef = javaRef.trim();
  
  // Vanilla Items.*
  if (javaRef.startsWith('Items.')) {
    const name = javaRef.replace('Items.', '').toLowerCase();
    return `minecraft:${name}`;
  }
  // Vanilla Blocks.*
  if (javaRef.startsWith('Blocks.')) {
    const name = javaRef.replace('Blocks.', '').toLowerCase();
    return `minecraft:${name}`;
  }
  // DoggyItems.*
  if (javaRef.startsWith('DoggyItems.')) {
    let name = javaRef.replace('DoggyItems.', '').replace('.get()', '').toLowerCase();
    return `doggytalents:${name}`;
  }
  // DoggyBlocks.*
  if (javaRef.startsWith('DoggyBlocks.')) {
    let name = javaRef.replace('DoggyBlocks.', '').replace('.get()', '').toLowerCase();
    return `doggytalents:${name}`;
  }
  // ItemTags.*
  if (javaRef.startsWith('ItemTags.')) {
    const name = javaRef.replace('ItemTags.', '').toLowerCase();
    return `tag:${name}`;
  }
  // BlockTags.*
  if (javaRef.startsWith('BlockTags.')) {
    const name = javaRef.replace('BlockTags.', '').toLowerCase();
    return `tag:${name}`;
  }
  
  return `unknown:${javaRef}`;
}

function parseRecipes(javaSource: string): { [id: string]: Recipe } {
  const recipes: { [id: string]: Recipe } = {};
  
  // ===== SHAPED RECIPES =====
  // Match ShapedRecipeBuilder blocks
  const shapedRegex = /ShapedRecipeBuilder\.shaped\s*\(\s*RecipeCategory\.\w+,\s*([\w.()]+?)(?:\.get\(\))?\s*(?:,\s*(\d+))?\s*\)([\s\S]*?)\.save\s*\(\s*consumer\s*(?:,\s*[^)]+)?\s*\)/g;
  
  let match;
  while ((match = shapedRegex.exec(javaSource)) !== null) {
    const outputRef = match[1];
    const count = parseInt(match[2] || '1');
    const body = match[3];
    
    // Extract patterns
    const patternMatches = [...body.matchAll(/\.pattern\s*\(\s*"([^"]{1,3})"\s*\)/g)];
    const pattern = patternMatches.map(m => m[1]);
    
    // Pad patterns to 3 chars
    const paddedPattern = pattern.map(p => p.padEnd(3, ' '));
    
    // Extract key definitions
    const key: { [char: string]: string } = {};
    const defineMatches = [...body.matchAll(/\.define\s*\(\s*'(\w)'\s*,\s*([\w.()]+(?:\.get\(\))?)\s*\)/g)];
    for (const dm of defineMatches) {
      key[dm[1]] = resolveItemId(dm[2]);
    }
    
    // Generate recipe ID from output
    const outputItem = resolveItemId(outputRef);
    const recipeId = outputItem.split(':')[1] || outputItem;
    
    // Check if we already have this recipe (alt recipes)
    let finalId = recipeId;
    if (recipes[finalId]) {
      // Check for explicit alt name in save()
      const saveMatch = match[0].match(/save\s*\(\s*consumer\s*,\s*Util\.getResource\s*\(\s*"([^"]+)"\s*\)\s*\)/);
      if (saveMatch) {
        finalId = saveMatch[1];
      } else {
        finalId = `${recipeId}_alt`;
      }
    }
    
    recipes[finalId] = {
      type: 'shaped',
      pattern: paddedPattern,
      key,
      output: { item: outputItem, count }
    };
  }
  
  // ===== SHAPELESS RECIPES =====
  const shapelessRegex = /ShapelessRecipeBuilder\.shapeless\s*\(\s*RecipeCategory\.\w+,\s*([\w.()]+?)(?:\.get\(\))?\s*(?:,\s*(\d+))?\s*\)([\s\S]*?)\.save\s*\(\s*consumer\s*(?:,\s*[^)]+)?\s*\)/g;
  
  while ((match = shapelessRegex.exec(javaSource)) !== null) {
    const outputRef = match[1];
    const count = parseInt(match[2] || '1');
    const body = match[3];
    
    // Extract ingredients
    const ingredients: string[] = [];
    const reqMatches = [...body.matchAll(/\.requires\s*\(\s*([\w.()]+(?:\.get\(\))?)\s*(?:,\s*(\d+))?\s*\)/g)];
    for (const rm of reqMatches) {
      const itemId = resolveItemId(rm[1]);
      const qty = parseInt(rm[2] || '1');
      for (let i = 0; i < qty; i++) {
        ingredients.push(itemId);
      }
    }
    
    const outputItem = resolveItemId(outputRef);
    const recipeId = outputItem.split(':')[1] || outputItem;
    
    let finalId = recipeId;
    if (recipes[finalId]) {
      const saveMatch = match[0].match(/save\s*\(\s*consumer\s*,\s*Util\.getResource\s*\(\s*"([^"]+)"\s*\)\s*\)/);
      if (saveMatch) {
        finalId = saveMatch[1];
      } else {
        finalId = `${recipeId}_shapeless`;
      }
    }
    
    recipes[finalId] = {
      type: 'shapeless',
      ingredients,
      output: { item: outputItem, count }
    };
  }
  
  // ===== COOKING RECIPES (via registerTripleCooking) =====
  const cookingRegex = /registerTripleCooking\s*\(\s*consumer\s*,\s*\n?\s*Ingredient\.of\s*\(\s*([\w.()]+(?:\.get\(\))?)\s*\)\s*,\s*\n?\s*([\w.()]+(?:\.get\(\))?)\s*,/g;
  
  while ((match = cookingRegex.exec(javaSource)) !== null) {
    const inputItem = resolveItemId(match[1]);
    const outputItem = resolveItemId(match[2]);
    const recipeId = (outputItem.split(':')[1] || outputItem);
    
    recipes[`${recipeId}_smelting`] = {
      type: 'smelting',
      input: inputItem,
      output: { item: outputItem, count: 1 }
    };
    
    recipes[`${recipeId}_campfire`] = {
      type: 'campfire',
      input: inputItem,
      output: { item: outputItem, count: 1 }
    };
    
    recipes[`${recipeId}_smoking`] = {
      type: 'smoking',
      input: inputItem,
      output: { item: outputItem, count: 1 }
    };
  }
  
  return recipes;
}

// Main
const javaPath = path.join(__dirname, '..', 'DTRecipeProvider.java');
const outputDir = path.join(__dirname, '..', 'data');
const outputPath = path.join(outputDir, 'recipes.json');

if (!fs.existsSync(javaPath)) {
  console.error(`Java file not found: ${javaPath}`);
  process.exit(1);
}

const javaSource = fs.readFileSync(javaPath, 'utf8');
const recipes = parseRecipes(javaSource);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(recipes, null, 2));

console.log(`Parsed ${Object.keys(recipes).length} recipes → ${outputPath}`);

// Print summary
const types = { shaped: 0, shapeless: 0, smelting: 0, campfire: 0, smoking: 0 };
for (const r of Object.values(recipes)) {
  types[r.type] = (types[r.type] || 0) + 1;
}
console.log('Recipe types:', types);
