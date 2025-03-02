import React from "react";
import useRecipeStore from "./recipeStore";

const RecipeList = () => {
  // Access the recipes from the Zustand store
  const recipes = useRecipeStore((state) => state.recipes);

  // Display a message if no recipes exist
  if (recipes.length === 0) {
    return (
      <div className="empty-state">
        No recipes added yet. Add your first recipe!
      </div>
    );
  }

  return (
    <div className="recipe-list">
      <h2>My Recipes</h2>
      <div className="recipes-container">
        {recipes.map((recipe) => (
          <div className="recipe-card" key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
