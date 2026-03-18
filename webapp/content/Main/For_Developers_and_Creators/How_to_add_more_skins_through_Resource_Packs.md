---
title: How to add more skins through Resource Packs?
---



> This is arguably **the most preferred way** of extending the mod asset without modifying its code. You can use this to add various things to further customize it to your liking.
> 
> By using resource packs, you have the ability to encapsulate your work and dynamically add it to the game without even restarting Minecraft! You can even share your work if you want!

*However, this is only limited to **Textures**, for alterations to the models (eg. Adding/Removing cubes), use [Addons](For Developers and Creators#Addons - Implementing more Models.) instead!*

<hr>

**Difficulty:** 🦴

##### **Required Software:**
- File Explorer.
- A Text Editor (NotePad or VSCode).

##### **Required Knowledge:**
- Need to have basic computer knowledge. (Making folders + Zipping files)
- Need to have basic json editing. <s>(just look at the examples lol)</s>

##### **Example:**

- [NewWolvesForDTN](https://www.curseforge.com/minecraft/texture-packs/new-wolves-dtn-resource-pack)<hr>

## Initialization
- **Step 1:** Create a folder with the resource pack name.
- **Step 2:** Add a text file renamed to **<code>pack.mcmeta</code>**. Copy, paste this and modify it to your liking.
```json

{

  "pack":
 {

    "pack_format": 41, 

    "description": "DTN_Whatever_name_you_want"

  }

}

```*"pack_format": 15, if you're using 1.20-1.20.1*
- **Step 2.1:** Add a **thumbnail** for your resource pack. *(Optional)*
  - Requirements:
    - Use a 1:1 ratio image.
    - Name: pack.png
    - File Extension: .png

*You can use any image editing software: (paint.net, MSPaint, Photoshop,...)*

## Folder Content
- **Step 3:** Create a folder tree exactly like this:
  - assets
    - doggytalents
    - * textures
    - ** entity
    - *** dog
- **Step 4:** Within the **<code>dog</code>** folder, make:
  - A text file **<code>skin.json</code>**
  - A folder named **<code>custom</code>** : 
    - In this folder, you'll dump the textures in.
    - * *For consistency, file naming scheme will be:*  **<code>authorsname_texturesname</code>** (eg: mashxp_akita_inu)
    - ** **Note:** **No spaces** allowed.
    - ** Texture size: **64x32**px
```json line="1"

{
    "dog_skins" : [
        {
            "skin_name" : "Akita Inu",
            "skin_id" : "mashxp_akita_inu",
            "use_model" : "default",
            "author" : "MashXP", //optional, remember to remove the comments!
            "tags": "nihonken", //optional
            "based on": "Hachiko - A very famous Nihonken", //optional
            "mystery": true //optional, if you want to hide your skin.
        },
        //infinitely more can be added
        {
            "skin_name" : "Pochita",
            "skin_id" : "mashxp_pochita",
            "use_model" : "default", //you can use in-game models for the UV too! Ask the Devs for the Blockbench model file!
            "author" : "MashXP",
            "tags": "anime",
            "based on": "Pochita - Chainsaw Man"
        }
    ]
}

```

## Finalization and Testing
- **Step 5:** Zip the resource pack (.zip extension)
- **Step 6:** Locate the Resource Pack via Minecraft's Option. 
- **Step 7:** Paste the zipped file in the Resource Pack Folder (or you can drag and drop the file in). And enable the Resource Pack.

After this step, you should see your skins were added to the [Skin tab](Dog Menu).

----

I hope you find this guide helpful, feel free to ask any questions during the process (or maybe later on, I don't mind xD).

**Good luck!!! がんばってね〜！(⁠｡⁠•̀⁠ᴗ⁠-⁠)⁠✧**
![](/images/code_dogs.png)