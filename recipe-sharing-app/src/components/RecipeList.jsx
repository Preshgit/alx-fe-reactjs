import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";
import SearchBar from "./SearchBar";
import FavoriteButton from "./FavoriteButton";
import FavoritesList from "./FavoritesList";
import RecommendationsList from "./RecommendationsList";

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);
  const favorites = useRecipeStore((state) => state.favorites);

  // Initialize filteredRecipes when component mounts
  useEffect(() => {
    filterRecipes();
  }, [filterRecipes]);

  const displayRecipes =
    filteredRecipes.length > 0 || searchTerm ? filteredRecipes : recipes;

  return (
    <div className="recipe-list-container">
      <h1>Recipe Sharing App</h1>

      <SearchBar />

      {/* Show favorites section if any favorites exist */}
      {favorites.length > 0 && <FavoritesList />}

      {/* Recommendations section */}
      {favorites.length > 0 && <RecommendationsList />}

      <h2>All Recipes</h2>

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

// import { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useRecipeStore } from "./recipeStore";
// import SearchBar from "./SearchBar";

// const RecipeList = () => {
//   const recipes = useRecipeStore((state) => state.recipes);
//   const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
//   const searchTerm = useRecipeStore((state) => state.searchTerm);
//   const filterRecipes = useRecipeStore((state) => state.filterRecipes);

//   // Initialize filteredRecipes when component mounts
//   useEffect(() => {
//     filterRecipes();
//   }, [filterRecipes]);

//   const displayRecipes = filteredRecipes.length > 0 ? filteredRecipes : recipes;

//   return (
//     <div className="recipe-list-container">
//       <h1>Recipes</h1>

//       <SearchBar />

//       {recipes.length === 0 ? (
//         <p>No recipes yet. Add your first recipe!</p>
//       ) : displayRecipes.length === 0 ? (
//         <p>No recipes match your search for "{searchTerm}"</p>
//       ) : (
//         <>
//           {searchTerm && (
//             <p className="search-results-info">
//               Showing {displayRecipes.length}{" "}
//               {displayRecipes.length === 1 ? "recipe" : "recipes"}
//               matching "{searchTerm}"
//             </p>
//           )}

//           <div className="recipe-grid">
//             {displayRecipes.map((recipe) => (
//               <div key={recipe.id} className="recipe-card">
//                 <h2>{recipe.title}</h2>
//                 <p>
//                   {recipe.description.substring(0, 100)}
//                   {recipe.description.length > 100 ? "..." : ""}
//                 </p>
//                 {recipe.ingredients && recipe.ingredients.length > 0 && (
//                   <p className="recipe-card-ingredients">
//                     <strong>Ingredients:</strong>{" "}
//                     {recipe.ingredients.slice(0, 3).join(", ")}
//                     {recipe.ingredients.length > 3 ? ", ..." : ""}
//                   </p>
//                 )}
//                 <Link
//                   to={`/recipes/${recipe.id}`}
//                   className="view-details-link"
//                 >
//                   View Details
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </>
//       )}

//       <div className="add-recipe-button">
//         <Link to="/add-recipe">Add New Recipe</Link>
//       </div>
//     </div>
//   );
// };

// export default RecipeList;
