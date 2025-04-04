import React from "react";
import { Link } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";
import FavoriteButton from "./FavoriteButton";

const FavoritesList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const favorites = useRecipeStore((state) => state.favorites);

  const favoriteRecipes = recipes.filter((recipe) =>
    favorites.includes(recipe.id)
  );

  if (favoriteRecipes.length === 0) {
    return (
      <div className="favorites-container">
        <h2>My Favorites</h2>
        <p className="empty-favorites-message">
          You haven't added any favorite recipes yet. Mark recipes as favorites
          by clicking the star icon on recipe cards!
        </p>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <h2>My Favorites</h2>
      <div className="recipe-grid">
        {favoriteRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <div className="recipe-card-header">
              <h3>{recipe.title}</h3>
              <FavoriteButton recipeId={recipe.id} />
            </div>
            <p>
              {recipe.description.substring(0, 100)}
              {recipe.description.length > 100 ? "..." : ""}
            </p>
            {recipe.ingredients && recipe.ingredients.length > 0 && (
              <p className="recipe-card-ingredients">
                <strong>Ingredients:</strong>{" "}
                {recipe.ingredients.slice(0, 3).join(", ")}
                {recipe.ingredients.length > 3 ? ", ..." : ""}
              </p>
            )}
            <Link to={`/recipes/${recipe.id}`} className="view-details-link">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
