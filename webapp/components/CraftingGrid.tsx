'use client';

import React from 'react';
import itemTextures from '../data/item_textures.json';

interface ItemSlotProps {
  itemId?: string;
  count?: number;
  size?: 'normal' | 'large';
}

const ItemSlot: React.FC<ItemSlotProps> = ({ itemId, count, size = 'normal' }) => {
  if (!itemId) {
    return <div className={`recipe-slot recipe-slot-empty ${size}`} />;
  }

  const itemData = (itemTextures as any)[itemId];
  const texture = itemData?.texture || '';
  const name = itemData?.name || itemId;

  return (
    <div className={`recipe-slot ${size}`} title={name}>
      <img src={texture} alt={name} className="recipe-item-icon" />
      {count && count > 1 && <span className="recipe-count">{count}</span>}
    </div>
  );
};

export interface RecipeData {
  type: 'shaped' | 'shapeless' | 'smelting' | 'campfire' | 'smoking' | 'brewing';
  pattern?: string[];
  key?: { [char: string]: string };
  ingredients?: string[];
  input?: string;
  base?: string;
  ingredient?: string;
  output: { item: string; count: number };
}

export const CraftingGrid: React.FC<{ recipe: RecipeData }> = ({ recipe }) => {
  const renderShaped = () => {
    const grid = recipe?.pattern?.map(row => 
      row.split('').map(char => recipe?.key?.[char] || null)
    ) || [];

    return (
      <div className="crafting-container shaped">
        <div className="crafting-grid">
          {grid.flat().map((itemId, i) => (
            <ItemSlot key={i} itemId={itemId || undefined} />
          ))}
          {Array.from({ length: Math.max(0, 9 - (grid.flat().length)) }).map((_, i) => (
            <ItemSlot key={`empty-${i}`} />
          ))}
        </div>
        <div className="crafting-arrow"></div>
        <div className="crafting-output">
          <ItemSlot itemId={recipe?.output?.item} count={recipe?.output?.count} size="large" />
        </div>
      </div>
    );
  };

  const renderShapeless = () => {
    return (
      <div className="crafting-container shapeless">
        <div className="crafting-grid">
          {recipe?.ingredients?.map((itemId, i) => (
            <ItemSlot key={i} itemId={itemId} />
          ))}
          {Array.from({ length: Math.max(0, 9 - (recipe?.ingredients?.length || 0)) }).map((_, i) => (
            <ItemSlot key={`empty-${i}`} />
          ))}
        </div>
        <div className="crafting-arrow"></div>
        <div className="crafting-output">
          <ItemSlot itemId={recipe?.output?.item} count={recipe?.output?.count} size="large" />
        </div>
      </div>
    );
  };

  const renderCooking = () => {
    const iconClass = recipe?.type === 'smelting' ? 'furnace-fire' : 
                      recipe?.type === 'campfire' ? 'campfire-fire' : 'smoker-fire';
    
    return (
      <div className="cooking-container">
        <div className="cooking-input">
          <ItemSlot itemId={recipe?.input} />
        </div>
        <div className={`cooking-progress ${iconClass}`}></div>
        <div className="cooking-output">
          <ItemSlot itemId={recipe?.output?.item} count={recipe?.output?.count} size="large" />
        </div>
      </div>
    );
  };

  const renderBrewing = () => {
    return (
      <div className="brewing-container">
        <div className="brewing-inputs">
          <ItemSlot itemId={recipe?.ingredient} />
          <ItemSlot itemId={recipe?.base} />
        </div>
        <div className="brewing-action">
          <div className="brewing-progress bubbles"></div>
          <div className="crafting-arrow"></div>
        </div>
        <div className="brewing-output">
          <ItemSlot itemId={recipe?.output?.item} count={recipe?.output?.count} size="large" />
        </div>
      </div>
    );
  };

  switch (recipe.type) {
    case 'shaped': return renderShaped();
    case 'shapeless': return renderShapeless();
    case 'smelting':
    case 'campfire':
    case 'smoking': return renderCooking();
    case 'brewing': return renderBrewing();
    default: return null;
  }
};
