import { create } from "zustand";

// Create the recipe store with Zustand
const useRecipeStore = create((set) => ({
  // Initial state with empty recipes array
  recipes: [],

  // Action to add a new recipe to the store
  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [...state.recipes, newRecipe],
    })),

  // Action to set the entire recipes array (for initialization or bulk updates)
  setRecipes: (recipes) => set({ recipes }),
}));

export default useRecipeStore;
