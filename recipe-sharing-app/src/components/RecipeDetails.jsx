import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";
import EditRecipeForm from "./EditRecipeForm";
import DeleteRecipeButton from "./DeleteRecipeButton";

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === recipeId)
  );

  // Handle case where recipe is not found
  if (!recipe) {
    return (
      <div className="recipe-not-found">
        <h2>Recipe not found</h2>
        <button onClick={() => navigate("/recipes")}>Back to Recipes</button>
      </div>
    );
  }

  return (
    <div className="recipe-details">
      {isEditing ? (
        <EditRecipeForm recipe={recipe} onClose={() => setIsEditing(false)} />
      ) : (
        <>
          <h1>{recipe.title}</h1>
          <p className="recipe-description">{recipe.description}</p>

          {recipe.ingredients && recipe.ingredients.length > 0 && (
            <div className="recipe-ingredients">
              <h2>Ingredients</h2>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          )}

          {recipe.instructions && (
            <div className="recipe-instructions">
              <h2>Instructions</h2>
              <p>{recipe.instructions}</p>
            </div>
          )}

          <div className="recipe-actions">
            <button onClick={() => setIsEditing(true)}>Edit Recipe</button>
            <DeleteRecipeButton recipeId={recipe.id} />
            <button onClick={() => navigate("/recipes")}>
              Back to Recipes
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeDetails;
