---
title: Configuration
---

## Dog Render (Client)

### Directory: <code>*<your_minecraft_folder>\config\doggytalents-client.toml*</code>
Enables the particle effect on Full Kami dogs.
- <code>*enable_kami_particles = false*</code>
Disable this if you want to force all [Pack Puppy](Pack_Puppy) Dog to not render their Chest.
- <code>*render_chest = true*</code>
Enable this if you prefer to have The Classical Skin rendered on all dog regardless.
- <code>*always_render_classical = false*</code>
When enabled, Dogs will show injured texture while injured.
- <code>*render_incapacitated_overlay = true*</code>
When sneaking, a part of the dog's name will be rendered with a certain color, and the length of the part is based on the health percentage the dog has left.
- <code>*render_health_in_name = true*</code>
Configure what will be displayed in the middle of each of the info section (e.g Hunger, Gender, Mode) when rendering the Dog Status String located above the main Dog Name String.

- <code>*dog_info_seperator = " · "*</code>

Configure the format that will be used to display hunger value when rendering the Dog Status String located above the main Dog Name String.

- <code>*dog_info_hunger_format = "%d"*</code> 

Render a universal dog inventory access button in your inventory GUI. If this is turned off, you can still access the button via the dog's GUI in Talents > [Pack Puppy](Pack_Puppy).
- <code>*dog_inv_button_in_inv = true*</code>
Set a custom position for the universal dog inventory access button here. Can be utilized when the button overlaps with another mod's GUI feature or you simply prefer it being in a different position. This option only affects the Survival inventory screen. The position is the offset of the button from the top left corner of the box wrapping the whole inventory GUI.
- <code>*dog_inv_button_in_inv_x = 78*</code> (Range: -500 to 500)
- <code>*dog_inv_button_in_inv_y = 48*</code> (Range: -500 to 500)
If the default incapacitated texture proof too many graphics. You can substitute this friendlier texture instead.
- <code>*render_incap_txt_less_graphic = false*</code>
Render the dogs' name whose owner is not you with a different color.
- <code>*render_diffowner_name_different = true*</code>
Do not render dogs' names whose owner is not you.
- <code>*render_diffowner_name_dont = false*</code>
Always render dog nametags regardless even if the player blocks it by F1 mode.
- <code>*always_render_dog_name = false*</code>
Attempt to block third parties from rendering overlays that may conflict with DT's built-in tag. It is recommended that this be achieved via the target third-party's configurations if they have the option to disable nametag overlay for certain mobs (which they should). This option should only be used as the last resort.
- <code>*block_third_party_nametag = false*</code>
By default, a copy of the Classical (Vanilla Wolf Texture) provided by the mod is used to render The Classical Skin, this is to avoid conflicts with resource packs like Fresh Animations which are directly using the in-game wolf texture. Turning this on will make DTN directly reference the in-game texture.
- <code>*use_vanilla_res_for_classical = false*</code>
Show a fun icon on world loading screen.
- <code>*world_load_icon = true*</code>
Move the world load icon to the right corner.
- <code>*world_load_icon_r = false*</code>
Set the world load icon offset from the corner.
- <code>*world_load_icon_x = 0*</code>
- <code>*world_load_icon_y = 0*</code>
DTN's fun little world loading icon will occasionally show Ammy instead of Classical Pale. Disable this to force the icon to always show Classical Pale.
- <code>*ammy_spinna = true*</code>

Determine if dogs will render their armor.
- <code>*render_armor = true*</code>
Determine if dogs still render with a red overlay upon hurt like they usually do. This can be toggled on if the user prefers to not have the red overlay and relies on the animation to indicate hurting.
- <code>*block_red_overlay_when_hurt = false*</code>
Display extra smoke when the dog is on fire.
- <code>*display_smoke_when_on_fire = true*</code>
By default, dogs will render items in their mouth, regardless of models. This can be disabled if you prefer not to render it on some less compatible model.
- <code>*mouth_item_force_render = true*</code>
Specify the max latency allowed before force adjusting the animation time client side to sync with server's animation time. The unit is in ticks. Provide a non-positive integer to disable this. Value from 0 to 7 both inclusive will be defaulted to 7.
- <code>*max_animation_latency_allowed = 10*</code>
Currently, DTN is utilizing a new system for rendering [Doggy Armor](Doggy_Armor)'s Armor which allows DTN to directly use any texture which the armor item provided for the player, thus better replicating third-party armor. Set this to true if you prefer to use the old system instead.
- <code>*use_legacy_dog_armor_render = false*</code>
By default, DTN will try querying models from third parties designed for the player when rendering helmet on the Dog. Disable this to force DTN to use either vanilla's player model or DTN provided model designed for Dogs (specified by the below option).
- <code>*use_third_party_player_helmet_model = false*</code>
By default, if there is no custom Helmet Armor model for the Helmet Item, DTN will use its own helmet armor model designed for DTN Dog to render it on the Dog's head. Enable this to make DTN reuse the player's Helmet Model instead.
- <code>*use_player_helmet_model_by_default = false*</code>
Enable this to allow every World which is running on this Minecraft instance's Integrated Server to provide new players with a [Starter Bundle](Starter_Bundle) regardless of the world's serverconfig.
- <code>*enable_starter_bundle_by_default = false*</code>
Some special Dog Variants may display some special effects clientside. Set this to false to disable this behaviour.
- <code>*dog_variant_client_effect = true*</code>
Disable this to prevent Radio Collars from being rendered in case if the server requires those or Locator Orb to be present to be tracked using the Canine Tracker and you prefer to make the tracker invisible.
- <code>*render_radio_collar = true*</code>
Always render Overlay Accessories on Dogs as Translucent. This is to prevent Special Variant's overlay to override on the Overlay Accessories.
- <code>*translucent_all_overlay = true*</code>
Enable this to hide Wolf Mount Dog's Status Overlay when riding it.
- <code>*hide_wolf_mount_status = false*</code>
Enable this to hide Wolf Mount Dog's Status Overlay when riding it in Creative.
- <code>*hide_wolf_mount_status_creative = true*</code>
Use DTN's Dedicated Wolf Mount Overlay when riding the Dog to show its status. This will takes up two health lines and will render where the Vanilla Vehicle Health is and instead of it.
- <code>*dtn_wolf_mount_overlay = true*</code>
Force DTN's Dedicated Wolf Mount Overlay to always render Dog Health and Dog Hunger in percentages. When disabled, these entries will be rendered as their absolute values and only if the max values of these entries exceed 3 digits, they will be rendered as percentages.
- <code>*dtn_wolf_mount_overlay_percent = true*</code>
By default, DTN will render your Dogs' Names through walls. Disable this to make Owned Dogs' Names no longer visible through walls.
- <code>*show_dog_name_thru_wall = true*</code>
Enable this if you want to automatically clear the Dog Bed Model Cache every time Tags is updated on client side.
- <code>*dog_bed_clear_cache_auto = false*</code>
Configure the maximum value of Dog Bed variants that will be rendered. If the amount of Dog Bed variants rendered exceeds this limit, other variants will be rendered as the default variant. To reset the cache, do a resource reload (F3+T). Set this option to any value less than zero to remove the limit. 
- <code>*max_dog_bed_model_cache = 65536*</code>

#### Fabric Only
Currently, DTN Dog Bed renders with missing texture when Sodium/Iris is installed. That is due to Iris/Sodium causing some problems with Fabric Indigo rendering API which DTN utilize to render any supported material on the Dog Bed, which is out of our control. This option force DTN to not use its Custom Model and revert back to using vanilla's baked model. This prevent the Missing Texture with Iris/Sodium but also means that the Dog Bed can only render one casing and one bedding material.

- <code>*dogbed_force_default_model = true*</code>

However, this problem can be fixed by installing Indium Mod. But if you still want to use the default beds go ahead.

## Server Config

### Directory: <code>*<your_minecraft_folder>\saves\<your_world_name>\serverconfig\doggytalents-server.toml*</code>
By default, Dogs can starve to Incapacitated if are not fed properly. Disable this to prevent this behavior. Do note that you can still feed your Dog to recover health.
- <code>*disable_hunger = false*</code>
When enabled, DTN will provide new players of this world (relative to the point that this option is first enabled on this world) a [Starter Bundle](Starter_Bundle) which contains certain key items which assist you in starting with DTN.
- <code>*enable_starter_bundle = false*</code>
By default, each Dog will be one of the Biological Genders. This, like how Biological Genders work, adds restrictions on how Dogs can breed. Therefore, only Dogs whose gender is Biologically Opposed can mate with each other. Set this to true to disable this behavior.
- <code>*disable_dog_gender = false*</code>
When enabled, puppies get some levels from parents. When disabled, puppies start at 0 points.
- <code>*enable_pup_get_parent_levels = false*</code>
When enabled, dogs cannot be killed by any means (except creative-mode-bypass damage, in that case, you can still respawn your dog using his linked bed or commands). Instead, when his health reaches Zero, he will go into Incapacitated Mode.
- <code>*immortal_dogs = true*</code>
When enabled, dog can play tag with you. To make them play, throw a snowball at them.
- <code>*play_tag_with_dog = true*</code>
When enabled, dogs will start to miss you when you leave them for too long. and when you come back, they will rush to you and greet you with love!
- <code>*dog_greet_owner = true*</code>
Specify how many dogs can greet you when you approach more than one missing dog. The remaining dogs will remain in their position. To disable the limit, set this to any non-positive integer. Although this will cause all of your dogs to stand up and greet. **YOU HAVE BEEN WARNED! :).**
- <code>*dog_greet_owner_limit = 5*</code>
Option to disable dogs who mastered [Creeper Sweeper](Creeper_Sweeper) and are able to tackle Creepers. This is helpful if players intend their [Creeper Sweeper](Creeper_Sweeper) master dogs to focus on fighting Creeper instead of warning you, which may cause a bunch of false positives due to the range being so wide that it includes Creepers which are not in danger zone or not reachable.
- <code>*max_creeper_sweeper_dont_growl = true*</code>
Option to disable friendly fire for all players toward all dogs. This is used to always be the case with friendly fire disabled for a single dog.
- <code>*all_player_cannot_attack_dog = false*</code>
Option to prevent dogs from accidentally going into a portal and getting unnecessarily transferred to another dimension, causing the owner to have to take them back. The preferred way to make a dog go to another dimension is to have [Cross Origin Teleport](Dog Menu) set to true on that dog.
- <code>*all_dog_block_portal = true*</code>
Define how many dogs a player can listen to commands which summon more than one dog to you at the same time. Set this to any negative value to remove the limit completely.
- <code>*max_heel_limit = 20*</code>
Adjust this value to increase or decrease the Dog's hunger speed to your liking. Example: Set this to 0.5 to halve the Dog Hunger decrease speed.
- <code>*hunger_modifier = 1*</code>
Determine if the UUIDs of the dogs are being kept when training from vanilla and when they respawn on bed. This also allows Duplication Detection.
- <code>*preserve_uuid = true*</code>
Allow third party storage to store Dog and and load them back. This allow Mods which, for example, having an item that can store an entity, to work with DTN Dogs. This option requires a world restart to take effect. Disclaimer: While the Dog is in third-party storage, we do not guarantee any data integrity as it is entirely up to the other Mod to maintain the Dog Data. If the other Mod failed to keep the data, the Dog cannot be respawned and will be gone forever. You have been warned.
- <code>*trust_third_party_storage = false*</code>
Allow DTN to log and warn when detected a Dog being restored from third party storage when trust_third_party_storage is disabled.
- <code>*third_party_store_warn = true*</code>
By default, you can directly train an untamed wolf to a Dog with a Training Treat. Set this to True to disable.
- <code>*train_untamed_wolf = false*</code>
By default, Dogs respawning from bed after being killed will be Incapacitated and are required to be nursed back to life. Set this to False to disable.
- <code>*dog_respawn_incapacitated_when_killed = true*</code>
Enable this if you prefer [Mob Retriever](Mob_Retriever) to only work with DTN's dog.
- <code>*mob_retriever_only_carry_dog = false*</code>
Enable this if you prefer Mob Retriever to only work with Leashable Mobs.
- <code>*mob_retriever_only_carry_leashable = false*</code>
By default, Dogs extend their bounding box covering the passengers to avoid suffocating them while calculating the appropriate path. Set this to false to disable it, but be warned, although [Mob Retriever](Mob_Retriever) Dogs will still try to calculate the appropriate path while carrying another mob, there might be accidental suffocations.
- <code>*wolf_mount_passenger_collision = true*</code>
By default, [Conducting Bone](Conducting_Bone) users can summon their Dogs even when they are in other dimensions. Set this to false to limit [Conducting Bone](Conducting_Bone) Users to only summon Dogs of the same dimension.
- <code>*conducting_bone_cross_origin = true*</code>
Determine if Dog's Incapacitated value should be reset when taking any damage while being Incapacitated.
- <code>*incap_val_reset_when_hurt = true*</code>
Set the maximum amount of wolves each player can train to DTN's Dogs. If a player meet or exceed this cap, he will not be able to train more wolves into DTN's Dogs. Set this to a value greater than Zero to activate this cap, other value will disable the cap, meaning players can get unlimited dogs.
- <code>*train_wolf_limit = -1*</code>
Determine if Dogs summoned from Doggy Charms will have random Classical Variants instead of always being summoned as Pale.
- <code>*random_var_with_charm = true*</code>
Allow Doggy Tools Dogs to use Trident.
- <code>*doggy_tools_trident = true*</code>
By default, when a Doggy Tools Dog use a bow, DTN will create a dedicated Arrow Entity that tries to imitate vanilla's. Enable this if you prefer to use the vanilla arrow entity. Regardless, the arrows fired from Dog will not hit allies.
- <code>*doggy_tools_bow_vanilla_proj = false*</code>
Allow Non Following Farming Doggy Tools Dogs to farm without the present of their Owner in distance.
- <code>*doggy_tools_wander_farm = true*</code>
Allow Dogs who have Doggy Tools maxed out to help their owners bridging.
- <code>*doggy_tools_bridging = true*</code>
Specify how many Maxed out Doggy Tools dogs can help a player bridge at once.
- <code>*doggy_tools_bridging_limit = 1*</code>
Allow Players to Pet their Dogs.
- <code>*dog_petting = true*</code>
By default, one of the nearby Dogs will get jealous if you pet a Dog for too long.
- <code>*dog_petting_jealous = true*</code>
Allow Players to track Dogs using the Canine Tracker despite not having neither Radio Collars nor Locator Orbs equipped.
- <code>*allow_track_any_dog = false*</code>
When this option is enabled, Debug Information is Logged when a dog goes Offline, for example, being Unloaded To Chunk.
- <code>*log_when_dog_go_offline = true*</code>
Enable this to allow Besserker & Guard Dogs to consider any entity that is targetting the player a potential danger instead of just Enemy's.
- <code>*b_g_mode_less_strict = false*</code>
By default, DTN Dogs don't push their Owners. Set this to true to allow them to push their Owners like Vanilla Behaviour. Notice that you can still push your Dog even with this option disabled.
- <code>*dog_push_owner = false*</code>
By default, Incapacitated Dogs won't block portal, allowing them to be brought back from another dimension. Enable this to make Incapacitated Dogs still block portals.
- <code>*injured_dog_block_portal = false*</code>
By default, Wandering Dogs will not respond to the stay/stand whistle. Enable this to make them respond as usual.
- <code>*wandering_dog_whistle = false*</code>
Prevent all Dogs' kills from being recorded into its Kill Stats.
- <code>*disable_kill_stats = false*</code>
Disable all Wolf Armor Protection for DTN Dogs. They can still be used for Style.
- <code>*disable_wolf_armor_protection = false*</code>
Prevent Wild Wolves from being angry when you accidentally hit them.
- <code>*prevent_wild_wolves_angry = false*</code>
Tamed Wolves don't count towards the creature mob cap.
- <code>*tamed_wolf_non_mob_cap = false*</code>
Set the maximum number of Tactical Dogs that will response when their owner issues a Tactical Command via the Tactical Whistle. Set this to a value greater than Zero to activate this cap, other value will disable the cap.
- <code>*tactical_limit = 8*</code>
Set to false to disable the Carry Me Whistle.
- <code>*carry_me_whistle = true*</code>
Prevent Dog from going over the MaxBuildHeight of the world.
- <code>*dog_max_build_y_cap = true*</code>
Upon training a Vanilla Pale Wolf, if this option is enabled, a random Vanilla Dog Variant will be assigned to the newly trained DTN Dog instead of the Pale one only.
- <code>*random_var_on_pale = false*</code>
By default, players who are riding their Dog with Swimmer Dog Maxed out will be able to see well underwater. Set this to false to disable this behaviour.
- <code>*swimmer_dog_rider_water_vision = true*</code>
Enable this to allow DTN Dogs to eat all food with the obvious exception of Rotten Flesh. Note that this might result in DTN Dogs being able to eat food that must not be fed to a real life Dog e.g. Cookie. Use with caution.
- <code>*dog_can_eat_all_food = false*</code>
Enable this to make all non following docile Dogs to not lose hunger when standing.
- <code>*wandering_dog_non_hunger = false*</code>
This allows DTN Dogs to still save as a separate entity when riding on the player's head. This is to prevent them from being corrupted when Minecraft unexpectedly crashes without stopping properly while they are still on the player's head.
- <code>*save_dog_riding_player = true*</code>
This ensures that the target chunk that a Dog is moving to is actually loaded BEFORE it actually moves to.
- <code>*dog_load_chunk_before_move = true*</code>

## Talents

### Directory: <code>*<your_minecraft_folder>\saves\<your_world_name>\serverconfig\doggytalents-talents.toml*</code>
You can disable talents by setting the value to <code>*false*</code>.

## Respawn Tag

### Directory: <code>*<your_minecraft_folder>\saves\<your_world_name>\serverconfig\doggytalents-respawn_tags_to_remove.toml*</code>
Specify the Strategy to be used when picking which data to keep and remove when a Dog got unloaded into DTN Respawn Storage.

- 0: Removes all tags, keeping only the Dog's Owner, the Dog's Age, DTN's saved data and additional tags provided by tags_to_keep below.
- 1: Keep all tags, and remove certain tags specified in respawn_removal_tags except important DTN tags.
- Other: Defaulted to 0
- Range: > -2147483648
  - <code>*restore_strategy = 0*</code>  
  - <code>*respawn_removal_tags = []*</code>  
  - <code>*tags_to_keep = []*</code>

## Dog Custom Skin Config

### Directory: <code>*<your_minecraft_folder>\saves\<your_world_name>\serverconfig\doggytalents-dog_custom_skins.toml*</code>
Specify the Strategy to be used when picking which Dog Custom Skin could be set for a Dog. The texture's Hash Value is required to be the entry for these lists, they can be obtained via the Show Info page of Style > Skins at the Dog GUI.

- 0: Allow all
- 1: Allow all except blacklisted
- 2: Disallow all except whitelisted
- Other: Defaulted to 0
- Range: > -2147483648
  - <code>*strategy = 0*</code>  
  - <code>*whitelisted_sha1 = []*</code>  
  - <code>*blacklisted_sha1 = []*</code>

## Legacy Config (no longer used)

### Server
The time in ticks it takes for a baby dog to become an adult, default 48000 (2 Minecraft days) and minimum 0.

Range: > 0
- <code>*time_to_mature = 48000*</code>
Determines if dogs should whine when hunger reaches below 20 NP.
- <code>*whine_when_hungry = true*</code>
When enabled, dogs will path and eat edible items in the world.
- <code>*eat_food_on_floor = true*</code>