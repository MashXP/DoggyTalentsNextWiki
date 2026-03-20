'use client';

import React, { useState, useEffect } from 'react';
import recipesData from '../data/recipes.json';
import { CraftingGrid, RecipeData } from './CraftingGrid';

interface RecipeDisplayProps {
  id?: string;
  defaultData?: any;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ id, defaultData }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <div className="recipe-placeholder" style={{ minHeight: '100px' }} />;

  try {
    const recipe = (defaultData || (id ? (recipesData as Record<string, any>)[id] : undefined)) as RecipeData | undefined;

    if (!recipe) {
      return (
        <div className="recipe-error">
          Recipe not found: <code>{id}</code>
        </div>
      );
    }

    return (
      <div className="recipe-display-wrapper glass">
        <div className="recipe-header">
          <span className="recipe-type-label">
            {(recipe.type || 'Unknown').charAt(0).toUpperCase() + (recipe.type || 'Unknown').slice(1)} Recipe
          </span>
        </div>
        <div className="recipe-content">
          <CraftingGrid recipe={recipe} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering recipe:', error);
    return (
      <div className="recipe-error">
        Error rendering recipe: <code>{id}</code>
      </div>
    );
  }
};

export default RecipeDisplay;
