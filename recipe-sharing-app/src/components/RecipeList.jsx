import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";
import SearchBar from "./SearchBar";

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);

  // Initialize filteredRecipes when component mounts
  useEffect(() => {
    filterRecipes();
  }, [filterRecipes]);

  const displayRecipes = filteredRecipes.length > 0 ? filteredRecipes : recipes;

  return (
    <div className="recipe-list-container">
      <h1>Recipes</h1>

      <SearchBar />

      {recipes.length === 0 ? (
        <p>No recipes yet. Add your first recipe!</p>
      ) : displayRecipes.length === 0 ? (
        <p>No recipes match your search for "{searchTerm}"</p>
      ) : (
        <>
          {searchTerm && (
            <p className="search-results-info">
              Showing {displayRecipes.length}{" "}
              {displayRecipes.length === 1 ? "recipe" : "recipes"}
              matching "{searchTerm}"
            </p>
          )}

          <div className="recipe-grid">
            {displayRecipes.map((recipe) => (
              <div key={recipe.id} className="recipe-card">
                <h2>{recipe.title}</h2>
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
                <Link
                  to={`/recipes/${recipe.id}`}
                  className="view-details-link"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="add-recipe-button">
        <Link to="/add-recipe">Add New Recipe</Link>
      </div>
    </div>
  );
};

export default RecipeList;

// import { Link } from "react-router-dom";
// import { useRecipeStore } from "./recipeStore";

// const RecipeList = () => {
//   const recipes = useRecipeStore((state) => state.recipes);

//   return (
//     <div className="recipe-list">
//       <h1>Recipes</h1>

//       {recipes.length === 0 ? (
//         <p>No recipes yet. Add your first recipe!</p>
//       ) : (
//         <div className="recipe-grid">
//           {recipes.map((recipe) => (
//             <div key={recipe.id} className="recipe-card">
//               <h2>{recipe.title}</h2>
//               <p>{recipe.description.substring(0, 100)}...</p>
//               <Link to={`/recipes/${recipe.id}`}>View Details</Link>
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="add-recipe-button">
//         <Link to="/add-recipe">Add New Recipe</Link>
//       </div>
//     </div>
//   );
// };

// export default RecipeList;
