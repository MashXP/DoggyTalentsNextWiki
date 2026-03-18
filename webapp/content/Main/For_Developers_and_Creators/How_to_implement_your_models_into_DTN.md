---
title: How to implement your models into DTN?
---

##### **Prerequisite:**

- [Setting up your Dev Environment](Setting_up_your_Dev_Environment): Cloning GitHub repository
- [How to make your models DTN compatible?](How_to_make_your_models_DTN_compatible): Final Product

**Difficulty:** 🦴🦴

##### **Required Installation:**
- [Visual Studio Code](https://code.visualstudio.com/download)
- [Github for Desktop](https://desktop.github.com/)
- [Java Development Kit](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)  (for Windows, it's recommended to install the MSI Installer).
- [Git](https://git-scm.com/downloads)
- [Blockbench](https://www.blockbench.net/)
##### **Required Knowledge:**
- Need to have basic coding knowledge.
- Need to know how to clone repository on GitHub.
----

## Initialization
Assuming you have **already** made yourself a model that's DTN-compatible *(if not click [here](How to make your models DTN compatible))*, and have GitHub for Desktop installed.

1. Clone this repository via URL: https://github.com/MashXP/DTNAddonTemplate. Remember to create an empty and separate folder for the Addon.
1. Open in VSC

## Editing
Here are the list of changes you need to make to customize your Addon:

I already left a lot of "breadcrumbs" for you to trail in all if not most of the necessary files. So this should be easy for you.

### build.gradle
```java

plugins {
    id 'eclipse'
    id 'maven-publish'
    id 'net.minecraftforge.gradle' version '5.1.+'
}

version = '1.0' //replace here every time you update. 
group = 'com.github.<your_github>' //replace here
archivesBaseName = "YourAddonNameInCamelCase-1.20.1" //replace here

java.toolchain.languageVersion = JavaLanguageVersion.of(17)

...

        client {
            // Comma-separated list of namespaces to load gametests from. Empty = all namespaces.
            property 'forge.enabledGameTestNamespaces', 'addonname_dtn' //replace all 'addonname_dtn' instance throughout the repo but keep the _dtn
        }

...

    manifest {
        attributes([
            "Specification-Title": "Your Addon's Beautiful Name", //replace all 'Your Addon's Beautiful Name' instance
            "Specification-Vendor": "You :>", //and here

...

```

### mods.toml
```toml

modLoader="javafml"
loaderVersion="[40,)"
license="All Right Reserved"
issueTrackerURL=""
displayURL=""
logoFile="your_banner.png" #optional, but recommended
[mods](mods) #mandatory
    modId="addonname_dtn"
    version="${file.jarVersion}"
    1. updateJSONURL=""
    displayName="Your Addon's Beautiful Name"
    credits="You, MashXP and DashieDev (Providing the Base for the Addon)"
    authors="mashxp"
    description=" Your lovely description about the addon! It can be anything"

...

```

### pack.mcmeta
```json

{
    "pack": {
        "description": "Your Addon's Beautiful Name",
        "pack_format": 10
    }
}

```

### your_banner.png (recommended)
At the same directory as ***pack.mcmeta***
![](/images/your_banner.png)

### update.json
Remember to update here after each update.```json

{
    "homepage": "",
    "promos": {
       "1.20.1-latest": "1.0" //replace here
    }
 }

```

### ModelLayerLocations.java
```java

package addonname_dtn;

import net.minecraft.client.model.geom.ModelLayerLocation;
import net.minecraft.resources.ResourceLocation;

public class ModelLayerLocations {
    public static final ModelLayerLocation YOUR_DOG_MODEL = new ModelLayerLocation(new ResourceLocation(Constants.MOD_ID, "yourdogmodel"), "main"); //replace all 'YOUR_DOG_MODEL' and 'yourdogmodel' instance.
    //append here if you want more models.
}

```

### YourAddonNameInCamelCase.java
```java

package addonname_dtn;
import org.joml.Vector3f;

import doggytalents.api.events.RegisterCustomDogModelsEvent;
import doggytalents.api.events.RegisterDogSkinJsonPathEvent;
import doggytalents.api.events.RegisterCustomDogModelsEvent.DogModelProps.Builder;
import net.minecraft.resources.ResourceLocation;
import net.minecraftforge.api.distmarker.Dist;
import net.minecraftforge.client.event.EntityRenderersEvent.RegisterLayerDefinitions;
import net.minecraftforge.eventbus.api.IEventBus;
import net.minecraftforge.fml.DistExecutor;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.javafmlmod.FMLJavaModLoadingContext;
import addonname_dtn.models.YourDogDerootedModel;

@Mod(Constants.MOD_ID)
public class YourAddonNameInCamelCase {

    public YourAddonNameInCamelCase() {
        IEventBus modEventBus = FMLJavaModLoadingContext.get().getModEventBus();
        DistExecutor.unsafeRunWhenOn(Dist.CLIENT, () -> () -> {
            modEventBus.addListener(YourAddonNameInCamelCase::registeringSkin);
            modEventBus.addListener(YourAddonNameInCamelCase::registeringSkinJson);
            modEventBus.addListener(YourAddonNameInCamelCase::registerLayerDefinition);
        });

    }

    public static void registeringSkin(RegisterCustomDogModelsEvent event) {
        event.register(new Builder(getRes("dogmodelname"), ModelLayerLocations.YOUR_DOG_MODEL));

    //CUSTOMIZABLE REGISTERS
        // event.register(new Builder(getRes("chihuahua"), ModelLayerLocations.CHIHUAHUA)
        //     .withDefaultScale(0.704f));

        // event.register(new Builder(getRes("wolf"), ModelLayerLocations.BD_WOLF)
        //     .withGlowingEyes());

        // event.register(new Builder(getRes("pomeranian"), ModelLayerLocations.POMERANIAN)
        //     .withCustomRootPivot(new Vector3f(0, 17, 0)));
       
    }

    public static void registeringSkinJson(RegisterDogSkinJsonPathEvent event) {
        event.register(Constants.SKIN_JSON_PATH);
    }

    public static void registerLayerDefinition(RegisterLayerDefinitions event) {
        event.registerLayerDefinition(ModelLayerLocations.YOUR_DOG_MODEL, YourDogDerootedModel::createBodyLayer); 
        //The error should go away if you registered your dog model correctly!)
   }

    public static ResourceLocation getRes(String name) {
        return new ResourceLocation(Constants.MOD_ID, name);
    }
    
}

```

### YourDogDerootedModel.java
Each model should represented by a Java file.

#### In Blockbench

- After you finish [making your model DTN-compatible](How to make your models DTN compatible):
  - Go to **File** -> **Export** -> **Export Java Entity**
  - Save it somewhere (it doesn't matter).
  - Open the exported file in VSC.

#### In VSC
Copy this portion of the code.```java

// Made with Blockbench 4.10.3
// Exported for Minecraft version 1.17 or later with Mojang mappings
// Paste this class into your mod and generate all required imports

public class DefaultGeneralDogModel<T extends Entity> extends EntityModel<T> {
	// This layer location should be baked with EntityRendererProvider.Context in the entity renderer and passed into this model's constructor
	public static final ModelLayerLocation LAYER_LOCATION = new ModelLayerLocation(new ResourceLocation("modid", "defaultgeneraldogmodel"), "main");
	private final ModelPart root;
	private final ModelPart head;
	
//ignore all of these
.... 
// start copying here.
	public static LayerDefinition createBodyLayer() {
		MeshDefinition meshdefinition = new MeshDefinition();
		PartDefinition partdefinition = meshdefinition.getRoot();

		PartDefinition tail = partdefinition.addOrReplaceChild("tail", CubeListBuilder.create(), PartPose.offsetAndRotation(0.0F, 12.0F, 8.0F, 1.6144F, 0.0F, 0.0F));

		PartDefinition real_tail = tail.addOrReplaceChild("real_tail", CubeListBuilder.create().texOffs(9, 18).addBox(-1.0F, 0.0F, -1.0F, 2.0F, 8.0F, 2.0F, new CubeDeformation(0.0F)), PartPose.offset(0.0F, 0.0F, 0.0F));

...

		PartDefinition right_ear = real_head.addOrReplaceChild("right_ear", CubeListBuilder.create().texOffs(16, 14).mirror().addBox(-1.0F, -2.0F, -0.5F, 2.0F, 2.0F, 1.0F, new CubeDeformation(0.0F)).mirror(false), PartPose.offset(-2.0F, -3.0F, 0.5F));

		return LayerDefinition.create(meshdefinition, 64, 32);
	}
//stop here. And ignore the rest.

```***Tip**: Usually to figure out if you have derooted or not, PartDefinition tail usually shows up first. Otherwise you'd see PartDefinition root*

And paste it into **YourDogDerootedModel.java**```java

package addonname_dtn.models;

import net.minecraft.client.model.geom.PartPose;
import net.minecraft.client.model.geom.builders.CubeDeformation;
import net.minecraft.client.model.geom.builders.CubeListBuilder;
import net.minecraft.client.model.geom.builders.LayerDefinition;
import net.minecraft.client.model.geom.builders.MeshDefinition;
import net.minecraft.client.model.geom.builders.PartDefinition;

public class YourDogDerootedModel {
	// --- PASTE HERE (OVERWRITE ME!) ----

    // public static LayerDefinition createBodyLayer() {
	// 		MeshDefinition meshdefinition = new MeshDefinition();
	// 		PartDefinition partdefinition = meshdefinition.getRoot();

	// 		PartDefinition tail = partdefinition.addOrReplaceChild("tail", CubeListBuilder.create(), PartPose.offset(0.0F, 12.0F, 8.0F));

	// 		PartDefinition real_tail = tail.addOrReplaceChild("real_tail", CubeListBuilder.create(), PartPose.offset(0.0F, 0.0F, 0.0F));

	//...
	// 		return LayerDefinition.create(meshdefinition, 64, 64);
	//}

}

```

### dogmodelname.png
After registering your model, add your model's UV texture in the ***textures*** folder***.*** 

Example: 
![](/images/dogmodelnamepng.png)

### skin.json
```json

{
    "dog_skins" : [
        {
            "skin_name" : "Your Dog Model Name - Addon Name",
            "skin_id" : "addonname_dtn:textures/dogmodelname",
            "use_model" : "addonname_dtn:dogmodelname",
            "based_on" : "In case you want citation or else remove this line.",
            "tags" : "YourAddonName, or whichever is most unique out of your designs!",
            "author" : "You"
        } //remember to append a "," for each registry.
    ]
}

```

## Build and Finalizing

- Go to your Terminal (**<code>Ctrl+`</code>**), then type: **<code>./gradlew build</code>**
- Locate: build -> libs**, your brand-new Addon** should be there once the build is finished.

----It is necessary to test-run your Addon for errors. 

Here are some **common errors** that I've encountered:

- **Registry errors**: Double/Triple-check your code.
  - Skin won't show up.
  - Game won't start/crash.
  - Mismatching texture.
- **Visual error**: It's recommended to fix the model in Blockbench, re-export, and replace. 

----

I hope you find this guide helpful, feel free to ask any questions during the process. (or maybe later on, I don't mind xD).

**Good luck!!! がんばってね〜！(⁠｡⁠•̀⁠ᴗ⁠-⁠)⁠✧**![](/images/code_dogs.png)