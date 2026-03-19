---
title: FAQ
---

## Bugs

<details>
<summary>Before reporting a Bug...</summary>


1. Make sure you install the **latest** and **CORRECT version** of DTN.
2. We would prefer that you confirm that the bug is in fact DTN's and not other mods' if possible (a possible troubleshoot method could be using only DTN and slowly adding in the other mods).
3. Check it up on the wiki, ensure that's not intended by the Devs if possible.
4. If the bug persists, report the bug in the respective channel (either through the **Issue** section on [Github](https://github.com/DashieDev/DoggyTalentsNext/issues) or **#bugs-and-crash-report** on our [Discord](https://discord.gg/VnSkMufZEc) server).

</details>

<details>
<summary>How do I file a bug/crash report?</summary>

Your report should follow this template. (if your report doesn't include all of the *, we won't be able to have enough information to work on, therefore might be discarded.
```
- Title: A brief, descriptive title for the bug (e.g. “Crash when opening inventory”).

Description: A short summary of the bug and its impact.

- Steps to Reproduce:
Step 1: Describe the first action.
Step 2: Describe the second action.
Step 3: Describe the third action.
...

- Result:
Expected: (What you expected to happen.)
Actual: (What actually happened.)

- Environment:
Mod Loader + Version: (eg. NeoForge 21.0.87)
Minecraft Version:  (eg. 1.21)
Doggy Talents Next Version: (eg. 1.18.20-neopatch1)

Attachments:
Include any relevant screenshots, logs, or videos.
- If it's a crash, please provide the FULL crash log.

(* is mandatory.)

```

The report form will save us a lot of time so take your time to fill it in.

</details>

<details>
<summary>How do I access the crash log?</summary>

Go to *`<your_minecraft_directory>`* and zip your *log* folder and send it to us. If the *log* folder is too large then identify the moment when the bug/crash happens then send us that as well as all of the debug files + the latest log.

</details>

## Game Features

<details>
<summary>How do I get a dog?</summary>


- Use a [Training Treat](Training_Treat) on a Wolf. See more [here](Getting_Started)*.*

</details>

<details>
<summary>Why can't I open the Dog Menu?</summary>

- Have you [trained](Getting_Started) the dog yet? If you already trained but it still doesn't work, then you can report that to us via [Discord](https://discord.gg/VnSkMufZEc) or [Github](https://github.com/DashieDev/DoggyTalentsNext/issues).
- Note that if you suspected that another mod is overriding the  **<code>Sneak + Right-click</code>** , you can use the Stick and **<code>Right-click</code>** to access the Dog Menu as well

</details>

<details>
<summary>How does Dog hunger work?</summary>


- Once this number reaches **<code>0</code>**, the dog will begin to take damage *(basically starving)* until it either **dies** or reaches **<code>1 HP</code>**. See more [here](Basic_Core_Stats#Nourishment_Points)*.*

</details>

<details>
<summary>How do I take off/put on a Dog's Accessory?</summary>


- Locate [Dog Menu](Dog_Menu) -> Style tab -> Accessory. Left-click on the Accessory that you want to take off or put on in the upper and lower panel respectively. See more [here](Dog_Menu#Style).
- Additionally, you can quickly equip an accessory by Right-clicking on the Dog with the accessory.

</details>

<details>
<summary>Why some of the Dog Beds aren't showing up in the recipe/creative menu?</summary>


- The [Dog Beds](Dog_Bed) in Creative are randomly generated to a certain limit whenever the player boots up the world to avoid performance issues. Since the Dev wanted to make it so **every** wood type is applicable, including modded ones.
- Even if the beds aren't showing up on the menu, it is possible to craft them using [this recipe](Dog_Bed#Crafting).

</details>

<details>
<summary>My dog died/has a bloody texture! What do I do?</summary>

- Don't worry, this feature is intended! You just need to take good care of your dog and it'll be right back on its paws! See more [here](Immortal_Dogs#Bringing_Your_Best_Friend_Back_to_Action).

</details>

<details>
<summary>What can my Dog eat?</summary>


- Your Dog can eat everything a Vanilla Wolf can with the obvious exception - Rotten Flesh <s>(Seriously why tho? It's disgusting...)</s>
- Beside those, DTN also provide you with a bunch of sustainable [food items](Items#Food) that you can grow, craft and feed to your Dog.

</details>

<details>
<summary>How do I pet my dog?</summary>

- First, open the [Dog Menu](Dog_Menu) of any Dog and click on the Dog located at the [Home](Dog_Menu) tab. 
- The Dog Pet Menu will show up providing you with the instructions to proceed. Do note that you do need to **get VERY close (as close as you can get)** to the dog or else the game will open the Dog Menu instead. 
- Additionally, Back Hug and Belly Rub allow you to clip inside the Dog's hitbox a little bit while you are petting it in first person to get a closer pet. See the tutorial [here](https://www.youtube.com/shorts/Des9MssevHE).

</details>

<details>
<summary>My dog doesn't eat from the Pack Puppy Inventory/ Food Bowl.</summary>


- For a dog to auto eat, the Nourishment Point has to be **lower than 25**. 
- Dogs will not eat nor offer other dogs raw foods from the **Pack Puppy** inventory, preventing them from eating the food that the player stores inside **Pack Puppy** inventory for later cooking purposes. See more [here](Pack_Puppy). This also applies to Food Bowl as well.
- Also note that DTN Dogs, can't eat Rotten Flesh. <s>(Seriously why tho? It's disgusting...)</s>

</details>

<details>
<summary>How to prevent players from hitting each other's Dogs?</summary>


- There is currently two ways to achieve this: 
  - DTN's Friendly Fire protection for a Dog also applies to players that share the same vanilla team with the Dog's Owner as well. You can create a vanilla team and bind it to the players using the vanillla command:
  
  ```text
  /team add <name_of_the_team>
  /team join <name_of_the_team> <player_selector>
  ``` 
  - If you wish to disable all players from attacking each other's Dog in general. Set *`all_player_cannot_attack_dog = false`* in DTN's serverconfig. 

</details>

<details>
<summary>What is the maximum number of talent points that a dog could have?</summary>


- 105 (15+20+20+20+30, roughly 6-7 fully maxed out talents). *See more at [Leveling Systems](Leveling_Systems).* 

</details>

<details>
<summary>Is it possible for my dog to have EVERY single talent available? / Can I increase my dog's talent poinlimit?**</summary>


- Yes, but only if the dog has the [Creative Collar](Creative_Collar) (which can only be obtained in Creative Mode, or by commands). 

</details>

## Compatibility / Incompatibilities

<details>
<summary>I want to use BDxDTN (or any Skin Addons) on a server, is the mod required to be installed on the server itself?</summary>

- BDxDTN is a clientside mod. Therefore, you can join **any server with DTN installed** regardless if they have the mod loaded or not. The skin will get saved and rendered correctly on clients with BDxDTN. As for the other clients without BDxDTN, it will render as **Classical**.

</details>

<details>
<summary>My Doggy Tools Dog is behaving wierdly?</summary>

For now, the culprit is identified to be **Radium** mod that, it taps into the Mob Behavior system and indirectly affect DTN. As of now, the discovered problems are:

- Doggy Tools Dogs may still render with the previously held item despite it having already been removed. (Clientside mouth item desynchronization)
- Doggy Tools Dogs may do inconsistent damage with its weapon.

If the problem persists even without Radium, feel free to contact us on our Discord server, or issue on Github.

</details>

<details>
<summary>Why my Dog Beds' texture is broken/missing?</summary>


- If you're using Fabric with **Sodium**, you need to also install **Indium** as well.
- For JEI users, DTN hasn't provided support for JEI yet so for now you the quick crafting recipe in JEI's Menu is unavailable. Instead, you have to manually craft them using [this recipe](Dog Bed#Crafting).
- Let us know in the Discord server if you don't see yourself on this list, or the problem persists.

</details>

<details>
<summary>Should i remove the Old DoggyTalents mod before adding DTN?</summary>


- You **must remove any versions of the old DoggyTalents** if you have any before adding DTN as they cannot co-exist with each other.
- All of your previously trained DoggyTalents Dog will be automatically migrated to DTN.  

</details>

<details>
<summary>About Compatibility with mods that modifies the respawn mechanics (eg. Pet Cemetery).</summary>

- As of the recent updates, DTN will now **block any attempt** to respawn the dog from 3rd-party storage, as they **will** lead to **duplications**.
</details>

<details>
<summary>About Compatibility between DTN and a 3rd-party mod's feature that stores the dog in something. (eg. Carry On, Portable Mobs, Mobs in a Bucket, Ender Lead,...)</summary>

- Both mods may co-exist without problem but DTN won't do compatibility anytime soon since it would lead to duplications, as the old DT suffered from.
- DTN already provided you with a couple of solutions to transfer your dog, we recommend you use them instead. Some of them are:
- The [Conducting Bone](Conducting_Bone)
- Head Carrying: Sneak + Right-clicking with a Bone.
- [Riding your Dog](Wolf_Mount)
- [Cross-Origin Teleport](Dog_Menu#Edit_Info_Menu)
- [Heel Whistle Commands.](Whistle#Whistle_Modes)  etc...
- In case you, however, accidentally use that item on the dog and the dog is discarded by that mod,  you won't be able to retrieve your dog back from that mod since DTN prevents it due to Duplication Issues. To get your dog back, you must either:
- Use its [linked bed.](Dog Bed)
- Right-click an [unclaimed bed](Dog Bed) with a Totem Of Undying
- Use the [Respawn Command](Commands)
</details>

<details>
<summary>About Compatibility with Domestication Innovation and similar Tamable improvement mods.</summary>


- Both mods can co-exist fine as long as you don't use any of **certain** DI features for DTN dogs. 
- **We strongly recommend players to reserve the features that DI provides for Vanilla Tamables (ex: Vanilla Wolves) or other Tamable if compatible, instead of using it on DTN Dogs.**

- We already provided DTN Dogs with the features that Domestication Innovation has:

Domestic Innovation | DoggyTalentsNext (recommended) |
| --- | --- |
| Wander, Stay, Follow, Command Drum | Dog Modes, [Whistle](Whistle). |
| Swing Through Pets, Sweeping Edge Changes | Friendly Fire Option. |
| Pet Beds | immortal. |
| Wayward Lantern | Conducting Bone or [Canine Tracker](Canine_Tracker) & [Radio Collar](Radio_Collar). |
| Feather on a Stick | Sneak+Right-click with a Bone to carry your dog on your head. |
| Deed of Ownership | [Amnesia Bone](Amnesia_Bone) |
| Collar Tags | Dog Menu |

#### As for Pet Enchantments
Currently, there is **no guarantee** that DI features applied on DTN Dogs will work without **causing problems** down the line.
- For **stable experience (recommended)**: The player can configure DI to exclude DTN Dogs if possible to avoid conflict.

- For **those who want to test:**
According to our team testing so far, most enchantments **may** work. If you **insist** on making them work together, we would recommend you do it in a **separate testing world** to avoid corruption in your playthrough world.

#### Pet Enchantments Incompatibilities
So far here's the list of **Pet Enchantments incompatibilities** that we've discovered so far:

| Enchantments | Why? | Recommendation |
| --- | --- | --- |
| **Tethered Teleport** | might cause DTN dogs to disappear. | Cross-Orgin tp option, and will always teleport to you whenever you're far away even when you teleport. |
| **Amphibious** | might be a bit buggy and does not work that well. | it's recommended to use [Swimmer Dog](Swimmer_Dog), as it's more aesthetically polished and more stable + higher accuracy. |
| ... |  |  |

</details>

<details>
<summary>About Compatibility with mods that also add Rice or Agricultural features (eg. Farmer's Delight).</summary>

**Short answer:**

- We won't be adding a config to disable our rice.

**Long answer:**

- Rice is considered an **integral** part of DTN.  Rest assured that it can **properly co-exist** with other mods without causing too many problems.
- Keep in mind that **many crafting recipes use Rice** (not to mention sub-recipes), all of which can be found here. In the future, there will possibly be more items that utilize Rice (and its sub-recipe items) in the recipe.
- Not only that, certain items dropped/crafted from rice crops such as [Koji](Koji) are used for some **core features** of DTN, most notably [**Band-aids**](Band-Aid) to aid in **Recovering Injured Dogs**.
- Furthermore, the food we added also serves as an **alternative food source** to keep your dog well-nourished **without relying on 3rd parties**.
- As for DTN 1.18.12+, DTN Dogs can eat **pretty much anything** vanilla dogs can with the obvious exception of **Rotten Flesh**. This provides DTN Dogs with an **even more sustainable** food source than that of vanilla dogs.

But if you still wish to replace it, We won't give further instructions on this as it's **not a recommended** act and you'll have to search for tutorials on your own.

***Sidenote:***

*We won't do a "lite" version that excludes the rice. As it proves too much work for the current dev to maintain.* 

*If you want to give us a paw, we'd be more than happy to know!*

</details>

<details>
<summary>About Compatibility Fresh Animations.</summary>

Does Doggy Talents Next work with Fresh Animations?

**The short answer is no.**

Since Fresh Animation targets **specifically the Vanilla Minecraft Wolf,** which isn't our domain.

Although they look similar, DTN Dogs are entirely different entities (the IDs are different, the models are different,...)

Furthermore, DTN Dogs use their own Animation System which will not be easy to harmonize with Fresh Animations.

</details>

## Others

<details>
<summary>Can you Leash DTN Dogs?</summary>


- The way the vanilla leash interacts with mobs may conflict with DTN's dog navigation system.
- Dashie's opinion: Dog Leash is redundant because DTN dogs are really good at following their owners (if you want your dog to follow you closely you can switch to Guard Mode, you don't need to leash your dog in order to teleport far away, or switch dimensions (enable Cross Origin Teleport)) so having a leash is extra work for less gains.

</details>

<details>
<summary>Why DTN is heavily Japanese-themed?</summary>

- **Short answer**
  - As for now, the recent major update (The Nippon Update) revolves around the theme but don't worry, there will be BIGGER and BETTER future updates that will balance out the flavor!
- **Long answer**
  - Most of DTN's technical advances like the **Animation** system, and the new **Talents**, and **Accessories** are all inspired by a Japanese-themed game (which you all may know about is ***[Ōkami](https://en.wikipedia.org/wiki/%C5%8Ckami)***). We wanted to honor and embrace the Japanese culture as well as make the gameplay more unique. 
- For now we won't be doing much of the Japanese-related content as proven by recent updates.
- Again, our aim is loud and clear that DTN is a **Dog mod**, **not** a **Japanese mod**.

</details>

<details>
<summary>Why does our file grow "exponentially" large during the recent updates?</summary>

- Do rest assured that those extra megabytes won't affect your gameplay by any bit, since **70% of the size** is comprised mostly of high-quality assets.

</details>

<details>
<summary>Will there be a Cat Talents mod/addon?</summary>

- Although the DTN's Dev Artist loves cats and even owns one as well, it will not happen soon as currently the DTN Devs are **laser-focusing on the aspect of Wolves/Dogs**, and **we prefer to choose quality over quantity**, so you can expect once we have finished developing the Wolves/Dogs to the **maximum potential**, and only then we can move on to the next topic.
- However, if you want to have a Cat model over a dog then feel free to follow our tutorial on how to make your customized skin addons. See [here](How_to_make_your_models_DTN_compatible) for a 2-part tutorial.

</details>

<details>
<summary>Will there be backports further than 1.18.2? (eg. 1.8, 1.12.2, and 1.16.5)</summary>


- **Short answer** is no.
  - But unless you're capable of helping us in backporting then we'd love to have your help! Let us know through our [Discord](https://discord.gg/VnSkMufZEc) server.
- **Long answer**
  - While we are aware that 1.12.2 and 1.16.5 are the most modded versions as of now, our codebase is hugely based on 1.19.2 onwards which did some huge changes in the base game code. It's apparently not possible for several reasons: 
    - Firstly, our codebase is based on Java 17, therefore it heavily relies on features like the "var" keyword which does not present on Java 8 and former, which Minecraft 1.16.5 and under is based on respectively. We tried to find work around like Jabel but it resulted in weird bug in dev environment. 
    - Not only that, the 1.16.5 API is also missing some crucial features that we're depending on (we have to re-implement them there and it is not worth our time investment).
  - For the record, We actually did attempt **3 times** for 1.16.5 without success so I doubt it would make it to the versions in question anytime soon.

</details>

<details>
<summary>Why is DTN taking so long to update to the latest version of Minecraft?</summary>


- There are 2 main reasons:
  - We needed a stable development environment. This means we have to wait for Neoforge to make an official release for the update (betas are too risky and unstable and have a higher potential for future problems).
  - It takes time to painstakingly port DTN to a newer version. Even if we manage to launch DTN without crashing, there'd be some hidden bugs that might occur due to the slight difference between the current and the newly updated framework. Hence, stress testing and bug fixing (the cycle repeats until we're confident enough to release).
- Also, depending on which version of Minecraft we port to, the difference in the codebase can be huge, especially when it comes to systems that DTN depends on; in addition to redesigning our system to work with the newer version, we also have to maintain compatibility with the LTS version.
</details>