---
title: Bottle of Sake
infobox:
  title: Bottle of Sake
  image: sake.png
  rows:
  - ID: doggytalents:sake
  - Type: Food (Rice)
  - Properties: 'Resistance II: 1 min.'
  - Stackable: '64'
  description: Drink responsibly! Not suitable for underage doggos!
recipes:
  sake_brewing:
    type: brewing
    base: minecraft:potion
    ingredient: doggytalents:koji
    output:
      item: doggytalents:sake
      count: 1
  sake_crafting_fabric:
    type: shapeless
    ingredients:
    - minecraft:potion
    - doggytalents:koji
    output:
      item: doggytalents:sake
      count: 1
---
<infobox />

**Bottle of Sake** is a potent drink that grants significant buffs, though it carries a risk of intoxication for both you and your dog.

## Effects
### Primary Buffs (1 Minute)
- **Resistance II**, **Strength II**, **Speed**, and **Haste**.

### Drunk Effect (Random Chance)
- **Nausea II**, **Slowness IV**, **Mining Fatigue II**, and **Blindness IV** for 1-2 minutes (30-45 seconds for dogs).

## Obtaining
### Brewing
<recipe id="sake_brewing" />

### Crafting (Fabric)
On Fabric, combine a **Water Bottle** with **[Koji](Koji)** in a crafting grid.
<recipe id="sake_crafting_fabric" />

## Usage
- **<code>Right click</code>** to consume. Drink moderately!

## Used In
<usedin />


## Trivia
- Introduced in **DTN 1.18.0**.

<references />