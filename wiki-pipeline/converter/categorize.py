import os
import shutil

CONTENT_DIR = "src/content/Main"

# A completely flat map to destination folders relative to CONTENT_DIR
FILE_MAP = {
    # Root
    "Getting_Started.md": "",
    "Dog_Menu.md": "",
    "Achievements.md": "",
    "Configuration.md": "",
    "For_Developers_and_Creators.md": "",
    "FAQ.md": "",
    "Main_Page.md": "",
    "Doggy_Talents_Next_Wiki.md": "",
    "Unfinished_Wiki_Pages.md": "",
    "DTN's_Palette_Of_Paws_Variant_Checklist.md": "",

    # Behaviors
    "Behaviors.md": "Behaviors",
    "Basic_Core_Stats.md": "Behaviors",
    "Leveling_Systems.md": "Behaviors",
    "Commands.md": "Behaviors",
    "Immortal_Dogs.md": "Behaviors",
    "Dog_Behavior_Improvements.md": "Behaviors",
    "Animation.md": "Behaviors",

    # Talents (Based on Talents.wiki list)
    "Talents.md": "Talents",
    "Bed_Dog.md": "Talents",
    "Bed_Finder.md": "Talents",
    "Black_Pelt.md": "Talents",
    "Guard_Dog.md": "Talents",
    "Hunter_Dog.md": "Talents",
    "Wolf_Mount.md": "Talents",
    "Hell_Hound.md": "Talents",
    "Pack_Puppy.md": "Talents",
    "Pillow_Paw.md": "Talents",
    "Quick_Healer.md": "Talents",
    "Creeper_Sweeper.md": "Talents",
    "Doggy_Dash.md": "Talents",
    "Fisher_Dog.md": "Talents",
    "Happy_Eater.md": "Talents",
    "Pest_Fighter.md": "Talents",
    "Poison_Fang.md": "Talents",
    "Rescue_Dog.md": "Talents",
    "Shepherd_Dog.md": "Talents",
    "Roaring_Gale.md": "Talents",
    "Swimmer_Dog.md": "Talents",
    "Doggy_Torch.md": "Talents",
    "Doggy_Armor.md": "Talents",
    "Puppy_Eyes.md": "Talents",
    "Water_Holder.md": "Talents",
    "Doggy_Tools.md": "Talents",
    "Shock_Absorber.md": "Talents",
    "Mob_Retriever.md": "Talents",
    "Flying_Furball.md": "Talents",
    "Chemi_Canine.md": "Talents",
    "Fire_Drill.md": "Talents",
    "Sniffer_Dog.md": "Talents",
    "Gate_Woof.md": "Talents",
    "Ookamikaze.md": "Talents",
    "Playing_Tag.md": "Talents",

    # Items Root
    "Items.md": "Items",

    # Items/Blocks
    "Dog_Bed.md": "Items/Blocks",
    "Dog_Bath.md": "Items/Blocks",
    "Food_Bowl.md": "Items/Blocks",
    "Rice_Mill.md": "Items/Blocks",

    # Items/Throwables
    "Throw_Bone.md": "Items/Throwables",
    "Throw_Stick.md": "Items/Throwables",
    "Frisbee.md": "Items/Throwables",

    # Items/Treats
    "Training_Treat.md": "Items/Treats",
    "Super_Treat.md": "Items/Treats",
    "Master_Treat.md": "Items/Treats",
    "Kami_Treat.md": "Items/Treats",

    # Items/Utilities
    "Starter_Bundle.md": "Items/Utilities",
    "Whistle.md": "Items/Utilities",
    "Conducting_Bone.md": "Items/Utilities",
    "Canine_Tracker.md": "Items/Utilities",
    "Locator_Orbs.md": "Items/Utilities",
    "Empty_Locator_Orb.md": "Items/Utilities",
    "Breeding_Bone.md": "Items/Utilities",
    "Doggy_Charm.md": "Items/Utilities",
    "Treat_Bag.md": "Items/Utilities",
    "Energizer_Stick.md": "Items/Utilities",
    "Band-Aid.md": "Items/Utilities",
    "Amnesia_Bone.md": "Items/Utilities",
    "Gender_Bone.md": "Items/Utilities",
    "Scent_Treat.md": "Items/Utilities",
    "Magnifying_Bone.md": "Items/Utilities",

    # Items/Artifacts
    "Feathered_Mantle.md": "Items/Artifacts",

    # Items/Combat
    "Suspicious_Looking_Sickle.md": "Items/Combat",

    # Items/Food/Rice
    "Rice_Bowl.md": "Items/Food/Rice",
    "Onigiri.md": "Items/Food/Rice",
    "Sake_Nigiri_Sushi.md": "Items/Food/Rice",
    "Gyudon.md": "Items/Food/Rice",
    "Oyakodon.md": "Items/Food/Rice",
    "Natto_Rice.md": "Items/Food/Rice",
    "Bottle_of_Sake.md": "Items/Food/Rice",

    # Items/Food/Soy
    "Unpodded_Edamame.md": "Items/Food/Soy",
    "Tofu.md": "Items/Food/Soy",
    "Aburaage.md": "Items/Food/Soy",
    "Natto.md": "Items/Food/Soy",
    "Natto_Bite.md": "Items/Food/Soy", 
    "Soy_Milk.md": "Items/Food/Soy",
    "Miso_Soup.md": "Items/Food/Soy",

    # Items/Food/Others
    "Egg_Sandwich.md": "Items/Food/Others",
    "Onsen_Tamago.md": "Items/Food/Others",
    "Golden_A5_Wagyu.md": "Items/Food/Others",
    "Sausage.md": "Items/Food/Others",
    "Hot_Dog.md": "Items/Food/Others",

    # Items/Farming/Rice
    "Rice_Grains.md": "Items/Farming/Rice",
    "Paddy_Rice.md": "Items/Farming/Rice",
    "Koji.md": "Items/Farming/Rice",
    "Uncooked_Rice.md": "Items/Farming/Rice",
    "Uncooked_Rice_in_a_Bowl.md": "Items/Farming/Rice",

    # Items/Farming/Soy
    "Soy_Beans.md": "Items/Farming/Soy",
    "Soy_Pods.md": "Items/Farming/Soy",
    "Dried_Soy_Beans.md": "Items/Farming/Soy",
    "Dried_Soy_Pods.md": "Items/Farming/Soy",
    "Edamame.md": "Items/Farming/Soy",
    "Miso_Paste.md": "Items/Farming/Soy",

    # Items/Customization/Dyeable
    "Wool_Collar.md": "Items/Customization/Dyeable",
    "Cape.md": "Items/Customization/Dyeable",
    "Bowtie.md": "Items/Customization/Dyeable",
    "Chopin_Wig.md": "Items/Customization/Dyeable",
    "Bach_Wig.md": "Items/Customization/Dyeable",
    "Baker's_Hat.md": "Items/Customization/Dyeable",
    "Chef's_Hat.md": "Items/Customization/Dyeable",
    "Birthday_Hat.md": "Items/Customization/Dyeable",
    "Flying_Cape.md": "Items/Customization/Dyeable",
    "Lab_Coat.md": "Items/Customization/Dyeable",
    "Ceremonial_Garb.md": "Items/Customization/Dyeable",
    "Doggy_Contact_Lenses.md": "Items/Customization/Dyeable",
    "Flat_Cap.md": "Items/Customization/Dyeable",
    "Thick_Wool_Collar.md": "Items/Customization/Dyeable",
    "Angel_Wings.md": "Items/Customization/Dyeable",
    "Dog_Plushie.md": "Items/Customization/Dyeable",
    "Midi_Keyboard.md": "Items/Customization/Dyeable",
    "Striped_Scarf.md": "Items/Customization/Dyeable",
    "Gift_Costume.md": "Items/Customization/Dyeable",

    # Items/Customization/Non-dyeable
    "Spotted_Collar.md": "Items/Customization/Non-dyeable",
    "Multicoloured_Collar.md": "Items/Customization/Non-dyeable",
    "Tartan_Cape.md": "Items/Customization/Non-dyeable",
    "Dog_Sunglasses.md": "Items/Customization/Non-dyeable",
    "Leather_Jacket.md": "Items/Customization/Non-dyeable",
    "Guard_Suit.md": "Items/Customization/Non-dyeable",
    "Conan_Suit.md": "Items/Customization/Non-dyeable",
    "Pianist_Suit.md": "Items/Customization/Non-dyeable",
    "Death_Hood.md": "Items/Customization/Non-dyeable",
    "Smarty_Glasses.md": "Items/Customization/Non-dyeable",
    "Beastars's_Female_Uniform.md": "Items/Customization/Non-dyeable",
    "Beastars's_Male_Uniform.md": "Items/Customization/Non-dyeable",
    "Snorkel.md": "Items/Customization/Non-dyeable",
    "Broomstick.md": "Items/Customization/Non-dyeable",
    "Head_Band.md": "Items/Customization/Non-dyeable",
    "Kitsune_Mask.md": "Items/Customization/Non-dyeable",
    "Tengu_Mask.md": "Items/Customization/Non-dyeable",
    "Demon_Horns.md": "Items/Customization/Non-dyeable",
    "Plague_Doctor_Mask.md": "Items/Customization/Non-dyeable",
    "Witch_Hat.md": "Items/Customization/Non-dyeable",
    "SuperDog_Suit.md": "Items/Customization/Non-dyeable",
    "Bat_Wings.md": "Items/Customization/Non-dyeable",
    "Crow_Wings.md": "Items/Customization/Non-dyeable",
    "Divine_Retribution.md": "Items/Customization/Non-dyeable",
    "Soul_Reflector.md": "Items/Customization/Non-dyeable",
    "Fedora.md": "Items/Customization/Non-dyeable",
    "Propeller_Hat.md": "Items/Customization/Non-dyeable",
    "Angel_Halo.md": "Items/Customization/Non-dyeable",
    "MrBlueYeti's_Goose.md": "Items/Customization/Non-dyeable",
    "Deer_Antlers.md": "Items/Customization/Non-dyeable",
    "Firefighter_Suits.md": "Items/Customization/Non-dyeable",
    "Firefighter_Hats.md": "Items/Customization/Non-dyeable",
    "Dragon_Costume.md": "Items/Customization/Non-dyeable",
    "Christmas_Hat.md": "Items/Customization/Non-dyeable",
    "Christmas_Tree_Costume.md": "Items/Customization/Non-dyeable",
    "Christmas_Star.md": "Items/Customization/Non-dyeable",

    # Items/Customization/Others
    "Shrinking_Mallet.md": "Items/Customization/Others",

    # Items/Discs
    "Music_Discs.md": "Items/Discs",

    # Items/Creative_Exclusive
    "Creative_Collar.md": "Items/Creative_Exclusive",
    "Creative_Canine_Tracker.md": "Items/Creative_Exclusive",
    "Upright_Piano.md": "Items/Creative_Exclusive",
    "Grand_Piano.md": "Items/Creative_Exclusive",
    "Dog_Animation_Debug_Stick.md": "Items/Creative_Exclusive",
    "Creative_Radar.md": "Items/Creative_Exclusive",

    # Items/Legacy_Removed
    "Collar_Shears.md": "Items/Legacy_Removed",
    "Big_Bone.md": "Items/Legacy_Removed",
    "Tiny_Bone.md": "Items/Legacy_Removed",
    "Command_Emblem.md": "Items/Legacy_Removed",
    "Radar.md": "Items/Legacy_Removed",
    "Change_Dog_Owner.md": "Items/Legacy_Removed",
    "How_to_add_more_skins_through_Resource_Packs?.md": "Items/Legacy_Removed",
    "How_to_implement_your_models_into_DTN?.md": "Items/Legacy_Removed",
    "How_to_make_your_models_DTN_compatible?.md": "Items/Legacy_Removed",
}

def main():
    if not os.path.exists(CONTENT_DIR):
        print("Content directory not found.")
        return

    # First flatten everything back into CONTENT_DIR so we can process safely
    for root, dirs, files in os.walk(CONTENT_DIR, topdown=False):
        for file in files:
            if file.endswith(".md"):
                old_path = os.path.join(root, file)
                new_path = os.path.join(CONTENT_DIR, file)
                if old_path != new_path:
                    shutil.move(old_path, new_path)
        
        # remove inner dirs if empty
        if root != CONTENT_DIR:
            try:
                os.rmdir(root)
            except:
                pass


    moved = 0
    # Now map everything to explicit locations
    for filename in os.listdir(CONTENT_DIR):
        if not filename.endswith(".md"):
            continue

        file_path = os.path.join(CONTENT_DIR, filename)
        if not os.path.isfile(file_path):
            continue

        dest_folder = FILE_MAP.get(filename, "General") 
        dest_dir = os.path.join(CONTENT_DIR, dest_folder)

        os.makedirs(dest_dir, exist_ok=True)
        dest_path = os.path.join(dest_dir, filename)

        if file_path != dest_path:
            shutil.move(file_path, dest_path)
            moved += 1

    print(f"Organized {moved} files according to specific structure.")

if __name__ == "__main__":
    main()
