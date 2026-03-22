---
title: Rice Mill
infobox:
  title: Rice Mill
  image: rice_mill.png
  rows:
  - ID: doggytalents:rice_mill
  - Type: Block
  - Stackable: '64'
recipes:
  rice_mill:
    type: shaped
    pattern:
    - "FLF"
    - "LCL"
    - "FDF"
    key:
      F: tag:fences
      L: tag:logs
      C: minecraft:cobblestone_slab
      D: doggytalents:rice_wheat
    output:
      item: doggytalents:rice_mill
      count: 1
---
<infobox />

**Rice Mill** is a versatile processing station that automates the laborious task of refining crops like rice and soybeans. When strategically placed near flowing water, this mechanical marvel powers through your harvests, ensuring a steady supply of ingredients for your canine companions.

## Obtaining
### Crafting
<recipe />

## Usage

- <code>Right click</code> to place the block down.
- In order for the Mill to work, you need a 1x3 trench of Water (source or flowing) along with the wheel's direction. 
- Once the mill is setup correctly, animation will play and the bucket icon in the GUI will be filled with water.

![You can also connect Furnaces and Hoppers to load and unload the Mill!](images/rice_mill_block.webp "You can also connect Furnaces and Hoppers to load and unload the Mill!")

With its wheel facing away from you:
- A Hopper can be placed on the left side of the mill to feed it input resources.
- A Hopper/Chest/Furnace/Smoker can then be placed on the right side and the mill will feed it its output resources in the appropriate slot if possible.

### Rice Mill Recipes:
*(*note that the bowl is optional)*

| Input | Bowl? | Output |
| :--- | :---: | :--- |
| **Rice** | | |
| <item id="doggytalents:rice_grains" count="3" /> | ✔ | <item id="doggytalents:uncooked_rice_bowl" /> |
| <item id="doggytalents:uncooked_rice" count="3" /> | ✔ | <item id="doggytalents:uncooked_rice_bowl" /> |
| <item id="doggytalents:rice_wheat" /> | ✔ | <item id="doggytalents:uncooked_rice_bowl" /> |
| <item id="doggytalents:rice_grains" /> | | <item id="doggytalents:uncooked_rice" /> |
| <item id="doggytalents:rice_wheat" /> | | <item id="doggytalents:uncooked_rice" count="3" /> |
| **Soy** | | |
| <item id="doggytalents:soy_pods" /> | | <item id="doggytalents:soy_beans" count="3" /> |
| <item id="doggytalents:soy_pods_dried" /> | | <item id="doggytalents:soy_beans_dried" count="3" /> |
| <item id="doggytalents:edamame" /> | | <item id="doggytalents:edamame_unpodded" count="3" /> |
| <item id="doggytalents:soy_beans_dried" count="3" /> | ✔ | <item id="doggytalents:soy_milk" /> |
| <item id="doggytalents:soy_pods_dried" /> | ✔ | <item id="doggytalents:soy_milk" /> |
| **Others** | | |
| <item id="minecraft:wheat" /> | | <item id="minecraft:bread" /> |

## Trivia
- Introduced in **DTN 1.18.8**.
- It was the first animated block entity of DTN.
