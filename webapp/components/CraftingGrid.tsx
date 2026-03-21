'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import itemTextures from '../data/item_textures.json';
import { getAssetPath } from '@/lib/utils';

interface ItemSlotProps {
  itemId?: string | string[];
  count?: number;
  size?: 'normal' | 'large';
  currentIndex?: number;
}

export const ItemSlot: React.FC<ItemSlotProps> = ({ itemId, count, size = 'normal', currentIndex = 0 }) => {
  const itemIds = useMemo(() => {
    if (!itemId) return [];
    return Array.isArray(itemId) ? itemId : [itemId];
  }, [itemId]);

  const currentId = itemIds.length > 0 ? itemIds[currentIndex % itemIds.length] : null;

  if (!currentId) {
    return <div className={`recipe-slot recipe-slot-empty ${size}`} />;
  }

  const itemData = (itemTextures as any)[currentId];
  const rawTexture = itemData?.texture || (currentId.startsWith('/') ? currentId : '');
  const texture = rawTexture ? getAssetPath(rawTexture) : '';
  const name = itemData?.name || currentId;

  const getLink = () => {
    if (currentId.startsWith('minecraft:')) {
      return `https://minecraft.wiki/w/${encodeURIComponent(name)}`;
    }
    if (currentId.startsWith('doggytalents:')) {
      return `/${name.replace(/ /g, '_')}`;
    }
    if (currentId.startsWith('tag:')) {
      const tagName = name.replace(' (Any)', '');
      return `https://minecraft.wiki/w/Tag#${encodeURIComponent(tagName)}`;
    }
    return null;
  };

  const link = getLink();
  const isExternal = link?.startsWith('http');

  const content = (
    <>
      {texture ? (
        <img src={texture} alt={name} className="recipe-item-icon" />
      ) : (
        <div className="item-id-placeholder">{currentId}</div>
      )}
      {count && count > 1 && <span className="recipe-count">{count}</span>}
    </>
  );

  return (
    <div className={`recipe-slot ${size}`} title={name}>
      {link ? (
        isExternal ? (
          <a href={link} target="_blank" rel="noopener noreferrer" className="recipe-item-link">
            {content}
          </a>
        ) : (
          <Link href={link} className="recipe-item-link">
            {content}
          </Link>
        )
      ) : content}
    </div>
  );
};

export interface RecipeData {
  type: 'shaped' | 'shapeless' | 'smelting' | 'campfire' | 'smoking' | 'brewing';
  pattern?: string[];
  key?: { [char: string]: string | string[] };
  ingredients?: (string | string[] | null)[];
  input?: string | string[];
  base?: string | string[];
  ingredient?: string | string[];
  output: { item: string | string[]; count: number };
}

export const CraftingGrid: React.FC<{ recipe: RecipeData }> = ({ recipe }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxItems = useMemo(() => {
    let max = 1;
    if (recipe.ingredients) {
      recipe.ingredients.forEach(ing => {
        if (Array.isArray(ing)) max = Math.max(max, ing.length);
      });
    }
    if (recipe.key) {
      Object.values(recipe.key).forEach(val => {
        if (Array.isArray(val)) max = Math.max(max, val.length);
      });
    }
    if (Array.isArray(recipe.output.item)) {
      max = Math.max(max, recipe.output.item.length);
    }
    if (Array.isArray(recipe.input)) max = Math.max(max, recipe.input.length);
    if (Array.isArray(recipe.base)) max = Math.max(max, recipe.base.length);
    if (Array.isArray(recipe.ingredient)) max = Math.max(max, recipe.ingredient.length);
    return max;
  }, [recipe]);

  useEffect(() => {
    if (maxItems > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % maxItems);
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [maxItems]);

  const renderShaped = () => {
    // Pad pattern to 3x3
    const pattern = recipe.pattern || [];
    const fullGrid: (string | string[] | null)[] = Array(9).fill(null);
    
    pattern.forEach((row, rowIndex) => {
      row.split('').forEach((char, colIndex) => {
        if (char !== ' ' && recipe.key && recipe.key[char]) {
          fullGrid[rowIndex * 3 + colIndex] = recipe.key[char];
        }
      });
    });

    return (
      <div className="crafting-container shaped">
        <div className="crafting-grid">
          {fullGrid.map((itemId, i) => (
            <ItemSlot key={i} itemId={itemId || undefined} currentIndex={currentIndex} />
          ))}
        </div>
        <div className="crafting-arrow"></div>
        <div className="crafting-output">
          <ItemSlot itemId={recipe?.output?.item} count={recipe?.output?.count} size="large" currentIndex={currentIndex} />
        </div>
      </div>
    );
  };

  const renderShapeless = () => {
    return (
      <div className="crafting-container shapeless">
        <div className="crafting-grid">
          {recipe?.ingredients?.map((itemId, i) => (
            <ItemSlot key={i} itemId={itemId || undefined} currentIndex={currentIndex} />
          ))}
          {Array.from({ length: Math.max(0, 9 - (recipe?.ingredients?.length || 0)) }).map((_, i) => (
            <ItemSlot key={`empty-${i}`} currentIndex={currentIndex} />
          ))}
        </div>
        <div className="crafting-arrow"></div>
        <div className="crafting-output">
          <ItemSlot itemId={recipe?.output?.item} count={recipe?.output?.count} size="large" currentIndex={currentIndex} />
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
          <ItemSlot itemId={recipe?.input} currentIndex={currentIndex} />
        </div>
        <div className={`cooking-progress ${iconClass}`}></div>
        <div className="cooking-output">
          <ItemSlot itemId={recipe?.output?.item} count={recipe?.output?.count} size="large" currentIndex={currentIndex} />
        </div>
      </div>
    );
  };

  const renderBrewing = () => {
    return (
      <div className="brewing-container">
        <div className="brewing-inputs">
          <ItemSlot itemId={recipe?.ingredient} currentIndex={currentIndex} />
          <ItemSlot itemId={recipe?.base} currentIndex={currentIndex} />
        </div>
        <div className="brewing-action">
          <div className="brewing-progress bubbles"></div>
          <div className="crafting-arrow"></div>
        </div>
        <div className="brewing-output">
          <ItemSlot itemId={recipe?.output?.item} count={recipe?.output?.count} size="large" currentIndex={currentIndex} />
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
