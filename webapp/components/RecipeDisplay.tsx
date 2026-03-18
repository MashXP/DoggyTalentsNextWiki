'use client';

import React from 'react';
import recipesData from '../data/recipes.json';
import { CraftingGrid, RecipeData } from './CraftingGrid';

interface RecipeDisplayProps {
  id: string;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ id }) => {
  const recipe = (recipesData as Record<string, any>)[id] as RecipeData | undefined;

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
          {recipe.type.charAt(0).toUpperCase() + recipe.type.slice(1)} Recipe
        </span>
      </div>
      <div className="recipe-content">
        <CraftingGrid recipe={recipe} />
      </div>
    </div>
  );
};

export default RecipeDisplay;
