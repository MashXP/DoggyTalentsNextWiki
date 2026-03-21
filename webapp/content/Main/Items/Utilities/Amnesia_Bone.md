---
title: Amnesia Bone
infobox:
  title: Amnesia Bone
  image: amnesia_bone.png
  rows:
  - ID: doggytalents:amnesia_bone
  - Type: Utilities
  - Stackable: '1'
  description: Right-click your Dog to Change Owner/Untame/Untrain Talents. If OP is enabled, Sneak + Right-click to Force Claim
recipes:
  amnesia_bone:
    type: shaped
    pattern:
    - " RN"
    - "WBR"
    - "SW "
    key:
      S: minecraft:soul_soil
      W: minecraft:nether_wart
      B: minecraft:bone
      R: minecraft:blaze_rod
      N: minecraft:netherite_ingot
    output:
      item: doggytalents:amnesia_bone
      count: 1
---
<infobox />

**Amnesia Bone** is a powerful utility item designed for trainers who need to reconsider their dogs' paths or management. Whether it's shifting ownership between players, untaming a companion, or untraining specific talents to reclaim experience points, this bone ensures that your dog's training and status can always be refined.

Each Amnesia Bone has a limited durability of **8 uses**.

*(For DTN 1.18.0+)*
When granted **Operator permission,** you can **<code>Sneak + Right click</code>** to force claim the dog.

## Obtaining
### Crafting
<recipe />

## Used In
- [Gender Bone](Gender_Bone)

## Usage

![Migrate owner usage.](/images/amnesia_bone_use.gif "Migrate owner usage.")

- **<code>Right click</code>** on your dog to open the GUI.
### General
- **Ownership Change:**
1. The dog must have Obey Others set to **<code>true</code>**.
2. Give the **Amnesia Bone** to the future owner, then **take the item back**.
3. **<code>Right click</code>** -&gt; **<code>Change Ownership</code>** -&gt; **<code>Confirm</code>**.
- **Untrain**: <i>In case you might have accidentally spawn too many dogs...</i>

### Talent
- Choose the talent you want to untrain.
- It will cost you 2 XP levels to untrain a maxed-out Talent. Otherwise, it would be 1 XP level.

## Trivia
- After **Ownership Change** is successful, the other player will receive this message: &quot;You are now the owner of **<code>&lt;dog name&gt;</code>**. Take good care of **<code>him/her</code>**&quot;. Otherwise, it'd be: &quot;Your request to own **<code>&lt;dog name&gt;</code>** has been rejected.&quot;
- Introduced in **DTN 1.12.0**.
- This item was suggested by *SilverstarShiro*.