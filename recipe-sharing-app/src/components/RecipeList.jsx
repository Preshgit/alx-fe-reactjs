import { Link } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div className="recipe-list">
      <h1>Recipes</h1>

      {recipes.length === 0 ? (
        <p>No recipes yet. Add your first recipe!</p>
      ) : (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <h2>{recipe.title}</h2>
              <p>{recipe.description.substring(0, 100)}...</p>
              <Link to={`/recipes/${recipe.id}`}>View Details</Link>
            </div>
          ))}
        </div>
      )}

      <div className="add-recipe-button">
        <Link to="/add-recipe">Add New Recipe</Link>
      </div>
    </div>
  );
};

export default RecipeList;

// import React from "react";
// import useRecipeStore from "./recipeStore";

// const RecipeList = () => {
//   // Access the recipes from the Zustand store
//   const recipes = useRecipeStore((state) => state.recipes);

//   // Display a message if no recipes exist
//   if (recipes.length === 0) {
//     return (
//       <div className="empty-state">
//         No recipes added yet. Add your first recipe!
//       </div>
//     );
//   }

//   return (
//     <div className="recipe-list">
//       <h2>My Recipes</h2>
//       <div className="recipes-container">
//         {recipes.map((recipe) => (
//           <div className="recipe-card" key={recipe.id}>
//             <h3>{recipe.title}</h3>
//             <p>{recipe.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RecipeList;
