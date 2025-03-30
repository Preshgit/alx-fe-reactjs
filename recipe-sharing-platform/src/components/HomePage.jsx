import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import RecipeCard from "./RecipeCard";
import recipeData from "../data/data.json";

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
                className="pl-10 pr-4 py-2 w-full md:w-64 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        {/* Featured Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Featured Recipes
          </h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recipes.slice(0, 4).map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
          {/* <div className="mt-6 text-center"> */}
          <Link
            to="/recipes"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200"
          >
            View All Recipes
          </Link>
          {/* </div> */}
        </section>

        {/* Search Results */}
        {searchTerm && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Search Results for "{searchTerm}"
            </h2>
            {filteredRecipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-100 rounded-lg">
                <p className="text-gray-600 text-lg">
                  No recipes found matching "{searchTerm}"
                </p>
                <p className="mt-2 text-gray-500">
                  Try a different search term or browse all recipes
                </p>
              </div>
            )}
          </section>
        )}

        {/* Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Breakfast",
              "Lunch",
              "Dinner",
              "Dessert",
              "Vegetarian",
              "Quick Meals",
              "Healthy",
              "Special Occasion",
            ].map((category) => (
              <Link
                key={category}
                to={`/category/${category.toLowerCase().replace(" ", "-")}`}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition duration-200 text-center"
              >
                <h3 className="font-medium text-gray-800">{category}</h3>
              </Link>
            ))}
          </div>
        </section>

        {/* Latest Recipes */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Latest Recipes
          </h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recipes.slice(0, 8).map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Recipe Explorer</h3>
              <p className="text-gray-300">
                Discover delicious recipes for every occasion.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/recipes"
                    className="text-gray-300 hover:text-white"
                  >
                    All Recipes
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-300 hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Subscribe</h3>
              <p className="text-gray-300 mb-4">
                Stay updated with our latest recipes!
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 w-full rounded-l-lg text-gray-800 focus:outline-none"
                />
                <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700 transition duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
            <p>
              &copy; {new Date().getFullYear()} Recipe Explorer. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
