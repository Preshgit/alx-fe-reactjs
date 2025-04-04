import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";
import FavoriteButton from "./FavoriteButton";

const RecommendationsList = () => {
  const recommendations = useRecipeStore((state) => state.recommendations);
  const generateRecommendations = useRecipeStore(
    (state) => state.generateRecommendations
  );
  const favorites = useRecipeStore((state) => state.favorites);

  useEffect(() => {
    // Generate recommendations when component mounts or favorites change
    generateRecommendations();
  }, [generateRecommendations, favorites]);

  if (recommendations.length === 0) {
    return null; // Don't show anything if no recommendations
  }

  return (
    <div className="recommendations-container">
      <h2>Recommended for You</h2>
      <p className="recommendations-description">
        Based on your favorite recipes, you might also like these:
      </p>
      <div className="recipe-grid">
        {recommendations.map((recipe) => (
          <div key={recipe.id} className="recipe-card recommendation-card">
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

export default RecommendationsList;
