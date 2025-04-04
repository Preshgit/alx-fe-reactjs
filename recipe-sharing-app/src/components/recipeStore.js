import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useRecipeStore = create(
  persist(
    (set, get) => ({
      recipes: [],
      searchTerm: "",
      filteredRecipes: [],
      favorites: [],
      recommendations: [],

      // Add a new recipe
      addRecipe: (recipe) =>
        set((state) => {
          const newRecipes = [
            ...state.recipes,
            { ...recipe, id: Date.now().toString() },
          ];
          return {
            recipes: newRecipes,
            filteredRecipes: state.filterRecipesByTerm(
              newRecipes,
              state.searchTerm
            ),
          };
        }),

      // Update an existing recipe
      updateRecipe: (updatedRecipe) =>
        set((state) => {
          const updatedRecipes = state.recipes.map((recipe) =>
            recipe.id === updatedRecipe.id ? updatedRecipe : recipe
          );
          return {
            recipes: updatedRecipes,
            filteredRecipes: state.filterRecipesByTerm(
              updatedRecipes,
              state.searchTerm
            ),
          };
        }),

      // Delete a recipe
      deleteRecipe: (recipeId) =>
        set((state) => {
          const remainingRecipes = state.recipes.filter(
            (recipe) => recipe.id !== recipeId
          );
          return {
            recipes: remainingRecipes,
            filteredRecipes: state.filterRecipesByTerm(
              remainingRecipes,
              state.searchTerm
            ),
            favorites: state.favorites.filter((id) => id !== recipeId),
          };
        }),

      // Set search term
      setSearchTerm: (term) =>
        set((state) => ({
          searchTerm: term,
          filteredRecipes: state.filterRecipesByTerm(state.recipes, term),
        })),

      // Filter recipes helper function
      filterRecipesByTerm: (recipes, term) => {
        if (!term.trim()) return recipes;

        const lowercaseTerm = term.toLowerCase();
        return recipes.filter(
          (recipe) =>
            recipe.title.toLowerCase().includes(lowercaseTerm) ||
            recipe.description.toLowerCase().includes(lowercaseTerm) ||
            (recipe.ingredients &&
              recipe.ingredients.some((ingredient) =>
                ingredient.toLowerCase().includes(lowercaseTerm)
              ))
        );
      },

      // Explicit filter action
      filterRecipes: () =>
        set((state) => ({
          filteredRecipes: state.filterRecipesByTerm(
            state.recipes,
            state.searchTerm
          ),
        })),

      // Favorites management
      addFavorite: (recipeId) =>
        set((state) => ({
          favorites: [...state.favorites, recipeId],
        })),

      removeFavorite: (recipeId) =>
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== recipeId),
        })),

      isFavorite: (recipeId) => {
        return get().favorites.includes(recipeId);
      },

      // Recommendations system
      generateRecommendations: () =>
        set((state) => {
          // Get all ingredients from favorites
          const favoriteRecipes = state.recipes.filter((recipe) =>
            state.favorites.includes(recipe.id)
          );

          const favoriteIngredients = new Set();
          favoriteRecipes.forEach((recipe) => {
            if (recipe.ingredients) {
              recipe.ingredients.forEach((ingredient) => {
                favoriteIngredients.add(ingredient.toLowerCase());
              });
            }
          });

          // Find recipes that aren't favorites but have similar ingredients
          const recommendedRecipes = state.recipes.filter((recipe) => {
            // Skip if already a favorite
            if (state.favorites.includes(recipe.id)) return false;

            // Check if recipe has ingredients in common with favorites
            if (recipe.ingredients) {
              return recipe.ingredients.some((ingredient) =>
                favoriteIngredients.has(ingredient.toLowerCase())
              );
            }

            return false;
          });

          // If no match by ingredients, recommend some random recipes
          if (recommendedRecipes.length === 0 && state.recipes.length > 0) {
            const nonFavorites = state.recipes.filter(
              (recipe) => !state.favorites.includes(recipe.id)
            );

            // Take up to 3 random recipes
            const randomRecommendations = [];
            const recipesToPick = Math.min(3, nonFavorites.length);

            for (let i = 0; i < recipesToPick; i++) {
              const randomIndex = Math.floor(
                Math.random() * nonFavorites.length
              );
              randomRecommendations.push(nonFavorites[randomIndex]);
              nonFavorites.splice(randomIndex, 1);
            }

            return { recommendations: randomRecommendations };
          }

          return { recommendations: recommendedRecipes };
        }),
    }),
    {
      name: "recipe-storage",
      partialize: (state) => ({
        recipes: state.recipes,
        favorites: state.favorites,
      }),
    }
  )
);

// import { create } from "zustand";

// export const useRecipeStore = create((set) => ({
//   recipes: [],
//   searchTerm: "",
//   filteredRecipes: [],

//   // Add a new recipe
//   addRecipe: (recipe) =>
//     set((state) => {
//       const newRecipes = [
//         ...state.recipes,
//         { ...recipe, id: Date.now().toString() },
//       ];
//       return {
//         recipes: newRecipes,
//         filteredRecipes: state.filterRecipesByTerm(
//           newRecipes,
//           state.searchTerm
//         ),
//       };
//     }),

//   // Update an existing recipe
//   updateRecipe: (updatedRecipe) =>
//     set((state) => {
//       const updatedRecipes = state.recipes.map((recipe) =>
//         recipe.id === updatedRecipe.id ? updatedRecipe : recipe
//       );
//       return {
//         recipes: updatedRecipes,
//         filteredRecipes: state.filterRecipesByTerm(
//           updatedRecipes,
//           state.searchTerm
//         ),
//       };
//     }),

//   // Delete a recipe
//   deleteRecipe: (recipeId) =>
//     set((state) => {
//       const remainingRecipes = state.recipes.filter(
//         (recipe) => recipe.id !== recipeId
//       );
//       return {
//         recipes: remainingRecipes,
//         filteredRecipes: state.filterRecipesByTerm(
//           remainingRecipes,
//           state.searchTerm
//         ),
//       };
//     }),

//   // Set search term
//   setSearchTerm: (term) =>
//     set((state) => ({
//       searchTerm: term,
//       filteredRecipes: state.filterRecipesByTerm(state.recipes, term),
//     })),

//   // Filter recipes helper function
//   filterRecipesByTerm: (recipes, term) => {
//     if (!term.trim()) return recipes;

//     const lowercaseTerm = term.toLowerCase();
//     return recipes.filter(
//       (recipe) =>
//         recipe.title.toLowerCase().includes(lowercaseTerm) ||
//         recipe.description.toLowerCase().includes(lowercaseTerm) ||
//         (recipe.ingredients &&
//           recipe.ingredients.some((ingredient) =>
//             ingredient.toLowerCase().includes(lowercaseTerm)
//           ))
//     );
//   },

//   // Explicit filter action (can be used to re-filter after data changes)
//   filterRecipes: () =>
//     set((state) => ({
//       filteredRecipes: state.filterRecipesByTerm(
//         state.recipes,
//         state.searchTerm
//       ),
//     })),
// }));
