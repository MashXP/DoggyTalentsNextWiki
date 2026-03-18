/**
 * lib/item-textures.ts
 * 
 * Maps Minecraft and DoggyTalents item IDs to their texture paths.
 */

const VANILLA_CDN_BASE = 'https://raw.githubusercontent.com/InvoxiPlayGames/Minecraft-Assets/master/assets/minecraft/textures/item';

export function getItemTexture(itemId: string): string {
  if (!itemId) return '';

  const [namespace, name] = itemId.includes(':') ? itemId.split(':') : ['minecraft', itemId];

  if (namespace === 'doggytalents') {
    // DTN items are in /images/[name].png
    return `/images/${name}.png`;
  }

  if (namespace === 'minecraft') {
    // Vanilla items from CDN
    return `${VANILLA_CDN_BASE}/${name}.png`;
  }

  if (namespace === 'tag') {
    // For tags, we'll return a placeholder or a generic icon
    if (name === 'wool') return `${VANILLA_CDN_BASE}/white_wool.png`;
    if (name === 'logs') return `${VANILLA_CDN_BASE}/oak_log.png`;
    if (name === 'planks') return `${VANILLA_CDN_BASE}/oak_planks.png`;
    if (name === 'fences') return `${VANILLA_CDN_BASE}/oak_fence.png`;
    if (name === 'flowers') return `${VANILLA_CDN_BASE}/poppy.png`;
    if (name === 'slabs') return `${VANILLA_CDN_BASE}/oak_slab.png`;
    
    return `${VANILLA_CDN_BASE}/barrier.png`; // Fallback for unknown tags
  }

  return '';
}

export function getItemName(itemId: string): string {
  if (!itemId) return '';
  const name = itemId.split(':')[1] || itemId;
  return name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
