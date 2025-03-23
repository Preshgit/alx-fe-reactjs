import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import RecipeCard from "./RecipeCard";
import recipeData from "../data.json";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch with a timeout
    const timer = setTimeout(() => {
      setRecipes(recipeData);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto py-6 px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <h1 className="text-3xl font-bold">Recipe Explorer</h1>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search recipes..."
                className="pl-10 pr-4 py-2 w-full md:w-64 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto py-8 px-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-800">
                {searchTerm
                  ? `Search Results: ${filteredRecipes.length} recipes found`
                  : "Popular Recipes"}
              </h2>
              <div className="flex gap-2">
                <button className="bg-white px-4 py-2 rounded-md shadow text-gray-700 hover:bg-gray-100 transition-colors">
                  Latest
                </button>
                <button className="bg-white px-4 py-2 rounded-md shadow text-gray-700 hover:bg-gray-100 transition-colors">
                  Popular
                </button>
              </div>
            </div>

            {filteredRecipes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">
                  No recipes found. Try a different search term.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4 mt-12">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">Recipe Explorer</h2>
              <p className="text-gray-400 mt-1">
                Share and discover amazing recipes
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400 transition-colors">
                About
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Contact
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
          <div className="mt-6 text-center md:text-left text-gray-400">
            <p>&copy; 2025 Recipe Explorer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
