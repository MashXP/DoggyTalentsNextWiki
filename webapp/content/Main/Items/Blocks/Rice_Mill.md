---
title: Rice Mill
---


<aside class="infobox glass">
  <div class="infobox-title">Rice Mill</div>
  <div class="infobox-image-wrapper"><img src="/images/rice_mill.png" alt="Rice Mill" class="infobox-image" /></div>
  <div class="infobox-content">
    <div class="infobox-row"><b>ID</b><span>rice_mill</span></div><div class="infobox-row"><b>Type</b><span>Block</span></div><div class="infobox-row"><b>Stackable</b><span>64</span></div>
  </div>
  
</aside>

**Rice Mill** is a placeable block that allows player to automate the process of making Rice/Soy items.

## Obtaining
### Crafting
<recipe id="rice_mill" />

## Usage

- <code>Right click</code> to place the block down.
- In order for the Mill to work, you need a 1x3 trench of Water (source or flowing) along with the wheel's direction. 
- Once the mill is setup correctly, animation will play and the bucket icon in the GUI will be filled with water.

![You can also connect Furnaces and Hoppers to load and unload the Mill!](/images/rice_mill_block.gif "You can also connect Furnaces and Hoppers to load and unload the Mill!")

With its wheel facing away from you:
- A Hopper can be placed on the left side of the mill to feed it input resources.
- A Hopper/Chest/Furnace/Smoker can then be placed on the right side and the mill will feed it its output resources in the appropriate slot if possible.

### Rice Mill Recipes:
*(*note that the bowl is optional)*

<table>
  <thead>
    <tr>
      <th>Input</th>
      <th>Bowl?</th>
      <th>Output</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="4" style="text-align: center; font-weight: bold; font-weight: bold;">Rice</td>
    </tr>
    <tr>
      <td><item id="doggytalents:rice_grains" count="3" /></td>
      <td>✔</td>
      <td><item id="doggytalents:uncooked_rice_bowl" /></td>
      <td></td>
    </tr>
    <tr>
      <td><item id="doggytalents:uncooked_rice" count="3" /></td>
      <td>✔</td>
      <td><item id="doggytalents:uncooked_rice_bowl" /></td>
      <td></td>
    </tr>
    <tr>
      <td><item id="doggytalents:rice_wheat" /></td>
      <td>✔</td>
      <td><item id="doggytalents:uncooked_rice_bowl" /></td>
      <td></td>
    </tr>
    <tr>
      <td><item id="doggytalents:rice_grains" /></td>
      <td></td>
      <td><item id="doggytalents:uncooked_rice" /></td>
      <td></td>
    </tr>
    <tr>
      <td><item id="doggytalents:rice_wheat" /></td>
      <td></td>
      <td><item id="doggytalents:uncooked_rice" count="3" /></td>
      <td></td>
    </tr>
    <tr>
      <td colspan="4" style="text-align: center; font-weight: bold;">Soy</td>
    </tr>
    <tr>
      <td><item id="doggytalents:soy_pods" /></td>
      <td></td>
      <td><item id="doggytalents:soy_beans" count="3" /></td>
      <td></td>
    </tr>
    <tr>
      <td><item id="doggytalents:soy_pods_dried" /></td>
      <td></td>
      <td><item id="doggytalents:soy_beans_dried" count="3" /></td>
      <td></td>
    </tr>
    <tr>
      <td><item id="doggytalents:edamame" /></td>
      <td></td>
      <td><item id="doggytalents:edamame_unpodded" count="3" /></td>
      <td></td>
    </tr>
    <tr>
      <td><item id="doggytalents:soy_beans_dried" count="3" /></td>
      <td>✔</td>
      <td><item id="doggytalents:soy_milk" /></td>
      <td></td>
    </tr>
    <tr>
      <td><item id="doggytalents:soy_pods_dried" /></td>
      <td>✔</td>
      <td><item id="doggytalents:soy_milk" /></td>
      <td></td>
    </tr>
    <tr>
      <td colspan="4" style="text-align: center; font-weight: bold;">Others</td>
    </tr>
    <tr>
      <td><item id="minecraft:wheat" /></td>
      <td></td>
      <td><item id="minecraft:bread" /></td>
      <td></td>
    </tr>
  </tbody>
</table>

## Trivia
- It was added in DTN 1.18.8.
- It was the first animated block entity of DTN.
