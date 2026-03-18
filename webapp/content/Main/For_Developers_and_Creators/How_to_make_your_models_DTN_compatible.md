---
title: How to make your models DTN compatible?
---

#### Disclaimer:

- This tutorial is for models that have major alterations to the vanilla models (eg. Adding/Removing cubes). 
- For re-texturing only, it is not necessary to do so. So if you are interested, click [here](How_to_add_more_skins_through_Resource_Packs). 
- The model being featured in this tutorial is the Basset Hound from MrBlueYeti's BetterDogs project for [Better Dogs X Doggy Talents Next](https://www.curseforge.com/minecraft/mc-mods/better-dogs-x-doggy-talents-next). Go check it out! 🥰

----Difficulty: 🦴🦴🦴

- Required Software: [Blockbench](https://www.blockbench.net/).
- Required Knowledge:
  - Need to have basic Blockbench knowledge

----I have provided you the template for you to work on, which you can download [here](https://drive.google.com/file/d/10Qzf4FimrNXGG8qFBK7c71XyfOUuRWvp/view?usp=sharing).
![](/images/addon1.1.png)

## Re-Grouping the Parents

| + | Steps | Description | Demonstration |
| --- | --- | --- | --- |
| 1 | Open your Dog Model file (mine is the Basset Hound from BetterDogs RP) and the DefaultDogModel.bbmodel (DDM) file that I just sent you. | ![](/images/addon1.2.png) |  |
| 2 | Copy the "root" group from DDM to your model, then paste it as the outermost group. | ![](/images/addon1.3.gif) |  |
|  | [The root should consist of:](/images/addon1.4.png "The root should consist of:") |
| 3 | Locate the parent group (or cubes) corresponding for each parts listed above. |  |  |
| Copy and Paste the parts to the corresponding group *(Use the Move or Rotate tool if necessary)* |  |  |  |
| ![](/images/addon1.5.gif) |  |  |  |

|-
|*Make sure you set the pivot and delete the opposite group before duping the cubes!*
|![](/images/addon1.7.gif)
|-
| colspan="3" |

![Everything belongs to the head group *(including right/left_ear)* should be inside of the real_head group.](/images/addon1.6.png "Everything belongs to the head group *(including right/left_ear)* should be inside of the real_head group.")

|-
|4
|Finally the tail, you have to make the tail rotation into 0, which means it points down directly to the ground.
|![](/images/addon1.8.gif)
|-
|5
|You can now yeet the old groups as the current model is now DTN compatible.
|![](/images/addon1.9.gif)
|}

## Fine-tuning the Parent Pivots

| 1 | Open your Dog Model file (mine is the Basset Hound from BetterDogs RP) and the DefaultDogModel.bbmodel (DDM) file that I just sent you. | ![](/images/addon1.2.png) |
|  | [The root should consist of:](/images/addon1.4.png "The root should consist of:") |

| Steps | Description | Demonstration |
| --- | --- | --- |
| 1 | Things to note for each pivot: | ![](/images/addon1.10.png) |
| 2 | ![](/images/addon1.11.png) |  |
| ![](/images/addon1.12.png)![](/images/addon1.13.png) |  |  |
| 3 | ![](/images/addon1.14.png) |  |
| 4 | ![](/images/addon1.15.png) |  |
| 5 | ![](/images/addon1.16.png)![](/images/addon1.17.png) |  |
| 6 | ![](/images/addon1.18.gif) |  |

## Testing the Animations

| Steps | Description | Demonstration |
| --- | --- | --- |
| 1 | Locate the **Animate** tab | ![](/images/addon1.19.png) |
| 2 | One by one, Copy and Paste each animations from DGDM to your current model. | ![](/images/addon1.20.gif) |
| 3 | Test for abnormalities. If it happens go back to Edit and fix the pivots, try to tinker with the pivot values, and see if it's getting better *(I have no clear way to explain this, sorry x.x)*. | [*For example, in this case the hind legs are poking too deep underground*](/images/addon1.21.png "*For example, in this case the hind legs are poking too deep underground*") | [*Solution: Move the y-pivot up by 2.*](/images/addon1.22.png "*Solution: Move the y-pivot up by 2.*") |

## Finalizing
After all of the animations look decent or "acceptable":

| Steps | Description | Demonstration |
| --- | --- | --- |
| 1 | Right-click the "root" group then **Resolve the "root"** | ![](/images/addon1.23.gif) |
| 2 | Convert the file into **Modded Entity** *(if it's in another format)*. |  |
| 3 | Double-check the file <s>as well as your decisions in life...</s> |  |
| 4 | **Get up and drink some water or do light exercises!!!** - *says MashXP* | no <s>(not yet)</s> |
| 5 | **Rinse and Repeat** for your other models! |  |

### **Final Product**
![](/images/{{#setmainimage:addon1.24.gif}})
----

#### ***A note for future you:***

> *Next time if you're planning to work on a new dog model.*
> 
> *Use the DefaultDogModel.bbmodel as a template to make it easier for implementation!*

----

I hope you find this guide helpful, feel free to ask any questions during the process (or maybe later on, I don't mind xD).

**Good luck!!! がんばってね〜！(⁠｡⁠•̀⁠ᴗ⁠-⁠)⁠✧**

![](/images/code_dogs.png)