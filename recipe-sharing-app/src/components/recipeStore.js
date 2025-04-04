import { create } from "zustand";

export const useRecipeStore = create((set) => ({
  recipes: [],
  searchTerm: "",
  filteredRecipes: [],

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

  // Explicit filter action (can be used to re-filter after data changes)
  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: state.filterRecipesByTerm(
        state.recipes,
        state.searchTerm
      ),
    })),
}));

// import { create } from "zustand";

// export const useRecipeStore = create((set) => ({
//   recipes: [],

//   // Add a new recipe
//   addRecipe: (recipe) =>
//     set((state) => ({
//       recipes: [...state.recipes, { ...recipe, id: Date.now().toString() }],
//     })),

//   // Update an existing recipe
//   updateRecipe: (updatedRecipe) =>
//     set((state) => ({
//       recipes: state.recipes.map((recipe) =>
//         recipe.id === updatedRecipe.id ? updatedRecipe : recipe
//       ),
//     })),

//   // Delete a recipe
//   deleteRecipe: (recipeId) =>
//     set((state) => ({
//       recipes: state.recipes.filter((recipe) => recipe.id !== recipeId),
//     })),
// }));
