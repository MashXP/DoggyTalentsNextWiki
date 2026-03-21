---
title: Conducting Bone
infobox:
  title: Conducting Bone
  image: conducting_bone.png
  rows:
  - ID: doggytalents:conducting_bone
  - Type: Utilities
  - Stackable: '1'
  - Fire Resistant: '✔'
recipes:
  conducting_bone:
    type: shaped
    pattern:
    - " B "
    - "RBR"
    - "PEP"
    key:
      P: minecraft:shulker_shell
      E: minecraft:end_crystal
      B: minecraft:bone
      R: minecraft:netherite_ingot
    output:
      item: doggytalents:conducting_bone
      count: 1
---
<infobox />

> &quot;*Ever feel like being a conductor about to conduct an orchestra for a Piano Concerto when you are teaming up with your dogs?*
> *But wait, where is the doggy orchestra?*
>
> *Yikes, you left them at home. No worries, every conductor needs **a Baton**!*
> 
> *Behold... the* ***Conducting Bone!***
> 
> *With its universal power, you can conduct any dog to teleport to you from **ANYWHERE** in the world, and when you no longer need them, you can conduct them to go back to their beds from **ANYWHERE** in the world so that they can have a nice rest!* &quot;

----

The **Conducting Bone** is a high-tier utility item that grants you absolute command over your pack's positioning across the world. Acting as a "baton" for your canine orchestra, it allows you to summon dogs to your side or send them back to their beds from anywhere within the same dimension, bypassing the range limitations of standard whistles.

This item is **fire/lava proof**.

## Obtaining
### Crafting
<recipe />

## Usage

- **<code>Right Click</code>** with the item in the main hand, and a GUI will open. Choose the conducting action between **<code>To Bed</code>** or **<code>To Self</code>** (*which is **<code>To Self</code>** by default*).
- Additionally, you can **hold <code>Shift</code>** right before using the item to make the button go to **<code>To Bed</code>** immediately upon opening. Use the arrow keys to select the dog you want to conduct.
- You can also **type to search** and finally **<code>Enter</code>** to conduct.
- **Note:**

> It may take a second for the conduct to finish. For the **<code>To Self</code>** conduct, you will see the dog present with a bit of **Purple Particles**.
> 
> A message will be prompted letting you know that the conduct is either **fulfilled or rejected**, and providing you with the ***Error Code***

## Condition
- The dog should be in the **same dimension** as the owner or the bed.

> (*Error Code:* **<code>NOBEDPOSATDIM</code>** **<code>DIFFERENTDIM</code>**)

- For summoning the dog **<code>To Self</code>**, there must be a safe position in a **<code>9x3x9</code>** area around you.

> (*Error Code :* **<code>NOSAFEPOS</code>**)

- For summoning the dog **<code>To Bed</code>**, the bed at that position must be present

> (*Error Code:* **<code>BEDDESTROYED</code>**) and the block above it should be cleared of any obstacles (*Error Code:* <code>BEDOBSTRUCTED</code>).

## Trivia
- Introduced in **DTN 1.9.0**.