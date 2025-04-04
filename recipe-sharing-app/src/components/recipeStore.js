import { create } from "zustand";

export const useRecipeStore = create((set) => ({
  recipes: [],

  // Add a new recipe
  addRecipe: (recipe) =>
    set((state) => ({
      recipes: [...state.recipes, { ...recipe, id: Date.now().toString() }],
    })),

  // Update an existing recipe
  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      ),
    })),

  // Delete a recipe
  deleteRecipe: (recipeId) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== recipeId),
    })),
}));

// import { create } from "zustand";

// // Create the recipe store with Zustand
// const useRecipeStore = create((set) => ({
//   // Initial state with empty recipes array
//   recipes: [],

//   // Action to add a new recipe to the store
//   addRecipe: (newRecipe) =>
//     set((state) => ({
//       recipes: [...state.recipes, newRecipe],
//     })),

//   // Action to set the entire recipes array (for initialization or bulk updates)
//   setRecipes: (recipes) => set({ recipes }),
// }));

// export default useRecipeStore;
