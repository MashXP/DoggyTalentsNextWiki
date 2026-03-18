# Developer Guide: Updating Wiki Data

This guide explains how to update the wiki's recipe and item data when new items are added to the DoggyTalentsNext mod.

## Prerequisites
- Node.js (for recipe parsing)
- Python 3 with `urllib` (for icon pulling and mapping)

## Step-by-Step Update Process

### 1. Update the Java Recipe Provider
If new recipes are added to the mod, copy the latest `DTRecipeProvider.java` into the `webapp/` directory.

### 2. Parse Recipes to JSON
Convert the Java source into a format the webapp can consume:
```bash
# From the webapp directory
python3 scripts/parse_recipes.py
```
This updates `webapp/data/recipes.json`.

### 3. Pull Missing Minecraft Icons
If the new recipes use Minecraft items that haven't been downloaded yet:
```bash
# From the webapp directory
python3 scripts/pull_mc_icons.py
```
This downloads icons from the Minecraft Wiki into `webapp/public/images/mcwikipull/`. It handles redirects and searches for the best match.

### 4. Generate Texture & Name Mapping
Finally, update the lookup table used by the frontend:
```bash
# From the webapp directory
python3 scripts/generate_item_textures.py
```
This updates `webapp/data/item_textures.json`, which contains pre-formatted names and local texture paths for all items used in the recipes.

## Repository Structure
- `webapp/scripts/`: Utility scripts for data processing.
- `webapp/data/`: Static JSON data files.
- `webapp/public/images/mcwikipull/`: Local cache of Minecraft item icons.
