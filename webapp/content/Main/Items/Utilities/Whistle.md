---
title: Whistle
infobox:
  title: Whistle
  image: whistle.png
  rows:
  - ID: doggytalents:whistle
  - Type: Utilities
  - Stackable: '1'
recipes:
  whistle:
    type: shaped
    pattern:
    - "IRI"
    - "II "
    key:
      I: minecraft:iron_ingot
      R: minecraft:redstone
    output:
      item: doggytalents:whistle
      count: 1
---
<infobox />

The **Whistle** is the essential command tool for any serious dog trainer, allowing for instant and precise communication with your entire pack. With a wide variety of modes and a dedicated interface, it provides complete control over your dogs' behavior, from basic positioning to complex talent-specific maneuvers.

## Obtaining
### Crafting
<recipe />

## Usage
- **<code>Right click</code>** to use the item.
### Options:
- **<code>Shift + Right Click</code>** with the item in the main hand, and a GUI will open.
### Whistle GUI
Via this GUI, you will be presented with the list of modes available now. You can also view in-game help for each mode directly within this screen.

#### Controls:
- **Search Bar:** The search bar is not focused by default. To focus it, press your **`Jump`** key while holding **`Sneak`**. While focused, you can type to search for a mode and press **`Enter`** to select it. To unfocus, **`Left click`** anywhere.
- **Navigation:** When the search bar is unfocused, you can use your **Movement Keys** (default **`WASD`**) or **`Arrow keys`** to highlight entries and navigate between pages.
- **Selection:** Press your **`Jump`** key (without sneaking) or **`Enter`** to select the highlighted mode. You can also use the mouse to click or press the corresponding **Number keys** (shown in Orange) to quickly pick a mode.

#### Hotkeys:
1. Press **<code>Set Hotkey</code>**.
2. Then, **<code>Left click</code>** to assign; **<code>Right click</code>** to unassign.
Commands also can be issued without opening this menu via keybinds which can be configured via **<code>Minecraft's option menu</code>**.

> * Currently, you can assign up to **4** functions to be triggered using their respective keybinds.
> * Note that these keybinds are only active when you have the **whistle** in **one of your hands.**

The Whistle will then remain in the mode and you can **<code>Right click</code>** the whistle again anytime to give the command again.
## Whistle Modes

Here are the currently available modes:

**Note:**

All dogs for this whistle to work on should be owned by the user and be in the radius.

Currently, the default radius of the whistle resides in an **<code>100*50*100</code>** area.
### Basic Modes
- **Stand**: Make all dogs stand. They might all teleport to you if you're far away.
- **Heel**: Make all *standing* dogs come to you.
- **Stay**: Make all *standing* dogs sit.
- **Go Behind**: Make all *standing* dogs run behind you.
- **Tactical**: Use this mode to command all of your dogs in [Tactical Mode](Basic_Core_Stats#Modes) to start attacking a target. 
  - Aim and use the whistle to fire a projectile; a successful hit signifies an attack order. 
  - **Tactical Whistle projectiles can pass through allies.** 
  - When attacking via this whistle, dogs will focus on the target, ignoring other behaviors that might cause them to switch targets.
- **Duty Whistle:** Used to toggle a dog's **"On Duty"** status. 
  - Using this whistle sets nearby standing dogs to be "On Duty" (and vice versa). 
  - While holding this whistle, "On Duty" dogs will have their names highlighted. 
  - You can configure the Whistle (via its GUI) to target either all dogs or only those currently **On Duty**.
- **Catch Up:** Commands dogs that are far away to teleport to your current location.
- **Heel By Name**: Use this mode to command certain dogs to come to you, even when they are sitting. Upon usage, a GUI will be presented.
  - Use the **`WASD`** or **`Arrow keys`** to select the dog you want to heel, you can also type to search and finally **`Enter`** to complete the command.
  - In default, the dog will stand up but you can force the dog to sit by **`Shift + Enter`** when completing the command (you will see the highlight color turns to Orange).
    - ** Soft Heel:**
    - * By default, the dog will always **teleport** to you upon using this command.
    - * If this option is set to **<code>true</code>**, dog will **stand up** (if sitting), **run to owner** as usual and **only teleport if too far**.

- **Heel By Group**: Same as Heel By Name, but it lets you make all Dogs belonging to a Group come to you.
- **Heel By Look:** Use while pointing it to one of your Dogs to make it come to you.
- **To Bed:** Commands all Dogs to return to their Claimed Bed if available nearby. ([Dog Bed](Dog_Bed) page notes for *fix* info.)
- **Ride With Me:** Commands the dog to take a ride with you. (boats, camel,...)
- **Howl!:** Use while pointing it to one of your Dogs and it will Unleash a Mighty Howl!!!
- **All Stand Switch Mode:** Command all **Standing, Following Dogs** to switch to a certain **Following Mode**.
- **Ssshhh!** : Make nearby Dogs go silent for a while. 
- **Stop Attacking:** Force nearby Dogs to clear their targets.
- **All Stand Cross Origin TP!:** Make it easier for players to manage which dog should teleport with you to another dimension.
### Talent-Specific Modes
These are modes that only can be used with corresponding talents.
- **Sheperd** : Make dogs with [Shepherd Dog](Shepherd_Dog) Talent start herding livestock.
- **Roaring** : Make dogs with [Roaring Gale](Roaring_Gale) Talent start roaring.
- **Mob Retriever:** Make dogs with [Mob Retriever](Mob_Retriever) to go and retrieve mobs.
- **Bed Dog:** Allows [Bed Dog](Bed_Dog) Talent dogs to enter sleep mode. "...To begin sleeping on your Dog, interact with it using the Bed Dog Whistle to make it lay down, then interact with it with the whistle again after it has laid down to begin sleeping on it..."
- **Carry Me:** Commands a nearby dog with the [Wolf Mount](Wolf_Mount) talent to pick you up and carry you on its back.
- **Dog Bridging:** Commands a dog with max-level [Doggy Tools](Doggy_Tools) to begin bridging. The dog must have building blocks in its toolbar and will bridge in the direction you are facing.

## Trivia
- Introduced in the original **Doggy Talents**.
- The Whistle Mode Changing User Interface was added in DTN 1.3.0beta since the old Mode Cycling method *"has proven itself to be relatively annoying and unintuitive, by allowing a great chance of accidental mode switch and trigger."*
- A legacy mode called "**Ok?**" (used to stand only healthy dogs) was removed in **DTN 1.18.21** due to its impracticality.
