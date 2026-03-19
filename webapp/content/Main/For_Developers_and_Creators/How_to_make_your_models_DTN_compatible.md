---
title: How to make your models DTN compatible?
---

#### Disclaimer:

- This tutorial is for models that have major alterations to the vanilla models (e.g., Adding/Removing cubes). 
- For re-texturing only, it is not necessary to do so. If you are interested, click [here](How_to_add_more_skins_through_Resource_Packs). 
- The model being featured in this tutorial is the Basset Hound from MrBlueYeti's BetterDogs project for [Better Dogs X Doggy Talents Next](https://www.curseforge.com/minecraft/mc-mods/better-dogs-x-doggy-talents-next). Go check it out! 🥰

---

**Difficulty:** 🦴🦴🦴

- **Required Software:** [Blockbench](https://www.blockbench.net/).
- **Required Knowledge:** Basic Blockbench knowledge.

---

I have provided a template for you to work on, which you can download [here](https://drive.google.com/file/d/10Qzf4FimrNXGG8qFBK7c71XyfOUuRWvp/view?usp=sharing).

<img src="/images/addon1.1.png" alt="Template Image" />
<span class="caption">Template model overview</span>

## Re-Grouping the Parents

<div class="tutorial-table">

| Step | Description | Demonstration |
| --- | --- | --- |
| 1 | Open your Dog Model file (mine is the Basset Hound from BetterDogs RP) and the `DefaultDogModel.bbmodel` (DDM) file. | <img src="/images/addon1.2.png" /> |
| 2 | Copy the "root" group from DDM to your model, then paste it as the outermost group. | <img src="/images/addon1.3.gif" /> |
| - | **The root should consist of:** | <img src="/images/addon1.4.png" /><br>*The root should consist of:* |
| 3 | Locate the parent group (or cubes) corresponding to each part listed above. <br><br> **Helpful Shortcuts:** <br> • `V`: Move \| `R`: Rotate \| `P`: Pivot \| `S`: Scale <br> • `Shift`: +/- 0.25 \| `Ctrl`: +/- 0.1 <br><br> *Keep in mind you have to match the parts exactly as your old model.* | <img src="/images/addon1.5.gif" /> |
| - | *Make sure you set the pivot and delete the opposite group before duplicating the cubes!* | <img src="/images/addon1.7.gif" /> |
| - | **Head Group Organization:** <br> Everything belongs to the head group (including `right`/`left_ear`) should be inside of the `real_head` group. | <img src="/images/addon1.6.png" /> |
| 4 | Finally the tail: you have to make the tail rotation 0, which means it points down directly to the ground. | <img src="/images/addon1.8.gif" /> |
| 5 | You can now remove the old groups as the current model is now DTN compatible. | <img src="/images/addon1.9.gif" /> |

</div>

## Fine-tuning the Parent Pivots

<div class="tutorial-table">

| Part | Pivot Guidelines | Demonstration |
| --- | --- | --- |
| **Head** | • `head`: usually at the center. <br> • `real_head`: must have the same pivot values as `head`. | <img src="/images/addon1.10.png" /> |
| **Ears** | • Between eyes and head corner OR at the connecting point. <br> • Symmetrical items (legs/ears) should have identical Y/Z values, with X being +/- the same number. | <img src="/images/addon1.11.png" /> |
| **Body** | • Pivot adjustments continued. <br> • Symmetrical items' pivots have the same Y and Z values. | <img src="/images/addon1.12.png" /> <img src="/images/addon1.13.png" /> |
| **Body** | • `upper_body`: at the center (group must be **-90**). <br> • `body`: slightly towards the mane from center (group must be **-90**). | <img src="/images/addon1.14.png" /> <br> <img src="/images/addon1.15.png" /> |
| **Legs** | • Usually at the connecting point of the leg and the mane/body. | <img src="/images/addon1.16.png" /> <br> <img src="/images/addon1.17.png" /> |
| **Tail** | • `tail`: top tip center of the butt. <br> • `real_tail`: must have the same pivot values as `tail`. | <img src="/images/addon1.18.gif" /> |

</div>

## Testing the Animations

<div class="tutorial-table">

| Step | Description | Demonstration |
| --- | --- | --- |
| 1 | Locate the **Animate** tab. *(If missing, convert the model to Modded Entity).* | <img src="/images/addon1.19.png" /> |
| 2 | One by one, Copy and Paste each animation from DGDM to your current model. | <img src="/images/addon1.20.gif" /> |
| 3 | Test for abnormalities. Fix pivots and tinker with values if you see: <br> • Head getting detached 💀 <br> • Legs poking through body <br> • Tail going weird <br><br> *Note: sit/tail_chase need tail rotated (x = -110) during animation; revert to x=0 after.* | <div align="center"><img src="/images/addon1.21.png" style="max-width: 48%; display: inline-block; margin: 5px;" /><img src="/images/addon1.22.png" style="max-width: 48%; display: inline-block; margin: 5px;" /><br>*Left: Hind legs poking too deep. Right: Solution (Move y-pivot up by 2).*</div> |

</div>

> **Last Resorts:**
> 1. **Move** the cubes.
> 2. **Scale** the cubes (Last last LAST option).
> *Tip: You can add connecting cubes if needed!*

## Finalizing
After all animations look acceptable:

<div class="tutorial-table">

| Step | Description | Demonstration |
| --- | --- | --- |
| 1 | Right-click the "root" group then **Resolve the "root"**. <br> *(Some animations may stop working; save as your "de-rooted" file from here).* | <img src="/images/addon1.23.gif" /> |
| 2 | Convert the file into **Modded Entity** *(if it's in another format)*. | |
| 3 | **Final Checklist:** <br> • Tail x-rotation is 0. <br> • Root has been resolved. <br> • Head items are inside `real_head`. <br> • Tail items are inside `real_tail`. <br> • Pivots for head/real_head match. | |
| 4 | **Get up and drink some water or do light exercises!!!** - *says MashXP* | no <s>(not yet)</s> |
| 5 | **Rinse and Repeat** for your other models! | |

</div>

### **Final Product**
<img src="/images/addon1.24.gif" alt="Final Product" />

---

#### ***A note for future you:***

> *Next time you're planning to work on a new dog model, use the `DefaultDogModel.bbmodel` as a template to make implementation easier!*

---

I hope you find this guide helpful! Feel free to ask any questions during the process.

**Good luck!!! がんばってね〜！(⁠｡⁠•̀⁠ᴗ⁠-⁠)⁠✧**

<div class="tutorial-figure">
  <img src="/images/code_dogs.png" alt="Developer Banner" />
</div>
