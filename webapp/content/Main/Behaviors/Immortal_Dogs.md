---
title: Immortal Dogs
---



> *"Tired of having to go all the way back home to respawn your dog when he, unfortunately, dies when you are* adventuring somewhere far away?
> 
> *The good news is, **Immortal Dogs*** - A huge feature of ***Classic Doggy Talents***, is back!"'''

## Enabling the feature
This behavior is enabled **by default**. 

To disable it for a specific world:

1. Navigate to that world's directory. 
1. Locate <code>config</code> folder.
1. Open <code>doggytalents-server.toml</code> file.
1. Set <code>immortal_dogs = false</code>.

## Disabling the visuals
If you are sensitive to the sight of blood or injuries, you may consider disabling the rendering of the visuals involved:

1. Navigate to that world's directory. 
1. Locate <code>config</code> folder.
1. Open <code>doggytalents-server.toml</code> file.
1. Set <code>render_incapacitated_overlay = false</code>.

*There is now an option to substitute a friendlier injured texture to be rendered instead. (See more in [Configuration](Configuration)).*

## Behavior
Let's say, your dog encounters the unimaginable, and his health hits 0. Expectedly, it will, as you know, *die*. For this behavior, the dog **doesn't die**. Instead, it goes into another **mode** called **Injured**.

<s>If your dog starved to death, it must have a [Golden A5 Wagyu](Golden_A5_Wagyu) in order to get back on its feet, [Band-Aid](Band-Aid) don't work. (WIP)</s>

With **Immortal Dogs** disabled *(which is not recommended)*, when the dog's health hits 0 *(or fallen into the void)* the dog will still die, but you can use a [Dog Bed](Dog_Bed) to revive them. 

- A **Linked Bed** will respawn its specific **Linked Dog.**
- **Unclaimed Beds** will pick from a **random Dog** *(that **you** own that died)* to be revived when using an **Totem of Undying** or [**commands**](commands)**.**

## Injured Mode
- It can't manually be accessed nor switched by changing the mode on the [Menu GUI](Dog Menu).
- In this mode, the dog is **immobilized**. It won't be able to listen to any commands or respond to any interactions from anyone, including his owner. His health stays at ½ a heart <code>(1 HP)</code> and undamageable in that state.
- His texture will also be changed (if graphic visuals are enabled). The textures signify the dog has been **injured** and is different based on how the dog was defeated. Right now, the default texture signifies the dog is bleeding and only changes when the dog is burned or poisoned, in which he will render with additional "charred" spots with smoke and ashes *or* green "poison stain" respectively.

| Cause | Kanji Meaning | Kanji Image |
| --- | --- | --- |
| Default | **敗** -> fail, lose | ![frameless](/images/default.png "frameless") |
| Drown | **溺** -> drown | ![frameless](/images/drown.png "frameless") |
| Poison | **毒** -> poison | ![frameless](/images/poison.png "frameless") |
| Starve | **餓**- > hunger, famine | ![frameless](/images/starve.png "frameless") |
| Burn | 焼 -> grill, burn | ![frameless](/images/burnt.png "frameless") |

![An Injured Dog](/images/an_injured_dog.png "An Injured Dog")

- Dogs **cannot teleport** in this mode.
- Upon entering the mode, his [Nourishment Points](Basic Core Stats#Nourishment Points) will be set to <code>-64</code> and will gradually regenerate to <code>0</code>. When it hits 0, the dog leaves the mode with its health and [Nourishment Points](Basic Core Stats#Nourishment Points) maxed out and will be considered fully recovered and ready for another adventure.
- The [Nourishment Points](Basic Core Stats#Nourishment Points) will reset to 0 whenever the dog is damaged by any source while healing. 
- The dog **cannot consume any meat or food** that normally regenerates [Nourishment Points](Basic Core Stats#Nourishment Points). 
## Bringing Your Best Friend Back to Action

> For your dog to be fully recovered, its [Nourishment Points](Basic Core Stats#Nourishment Points) have to reach <code>0</code>. It will auto-regenerate little by little. This process will be **extremely lengthy** in time as it should be, your dog deserves some **rest**.

### Luckily, the process can be sped up:
- When an injured dog stays on a **bed** (including the unclaimed [Dog Bed](Dog_Bed), a claimed bed the dog does not own, or a vanilla [bed](https://minecraft.wiki/w/Bed)), it will lie down and its healing speed will be increased. Additionally, healing will be increased even further if the **owner is nearby, less than <code>10 (blocks)</code>** **away**, in which heart particles will also start to appear.
- A [Golden A5 Wagyu](Golden_A5_Wagyu) can be fed to it also to further increase the healing speed.
- A [Band-Aid](Band-Aid) can also be applied to speed up the healing process. If enough bandages (8) are applied, the dog can begin to walk. 
  - **Note:** Every damage the dog takes will still cause the [Nourishment Points](Basic Core Stats#Nourishment Points) to reset and additionally cause all of the bandages to drop.
- The dog still won't be able to do anything up to this point besides following you. If there are empty beds (DTN or Vanilla) nearby, your dog will stay there to rest.
- You can <code>Sneak + Right-click</code> to pick the dog up using a [Bone](https://minecraft.fandom.com/wiki/Bone) and carry it to a safe area.

- If you are in a heated fight and you need your dogs immediately, you can always give them a [Totem of Undying](https://minecraft.fandom.com/wiki/Totem_of_Undying)  in which **it and all of the nearby dogs** will exit the mode **instantly**.

## Trivia

- Before 1.18.12, Injured Mode used to be called Incapacitated Mode, but the Devs changed it because it was mouthful.