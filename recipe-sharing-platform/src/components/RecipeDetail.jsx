import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Clock, Users, ChevronLeft, Star } from "lucide-react";
import recipeData from "../data.json";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch with timeout
    const timer = setTimeout(() => {
      // Find the recipe with the matching ID
      const foundRecipe = recipeData.find((r) => r.id === parseInt(id));

      // Add more detailed information that wouldn't be on the home page listing
      if (foundRecipe) {
        const enhancedRecipe = {
          ...foundRecipe,
          servings: "4",
          rating: 4.7,
          reviews: 124,
          ingredients: [
            "8 oz spaghetti pasta",
            "2 large eggs",
            "1 cup grated Pecorino Romano cheese",
            "4 slices bacon or pancetta, diced",
            "2 cloves garlic, minced",
            "Freshly ground black pepper",
            "Salt to taste",
            "Fresh parsley, chopped (for garnish)",
          ],
          instructions: [
            "Bring a large pot of salted water to boil. Add spaghetti and cook according to package directions until al dente.",
            "While pasta cooks, heat a large skillet over medium heat. Add the diced bacon and cook until crisp, about 5-7 minutes.",
            "Add minced garlic to the skillet and cook for 30 seconds until fragrant.",
            "In a bowl, whisk together eggs, grated cheese, and plenty of black pepper.",
            "Reserve 1/2 cup pasta water, then drain the pasta and immediately add it to the skillet with the bacon. Toss quickly to coat in the bacon fat.",
            "Remove the skillet from heat and quickly pour in the egg mixture, stirring constantly. The residual heat will cook the eggs, creating a creamy sauce.",
            "Add splash of reserved pasta water as needed to loosen the sauce.",
            "Serve immediately with extra grated cheese and fresh parsley on top.",
          ],
          tips: [
            "Work quickly when adding the egg mixture to ensure it doesn't scramble.",
            "For an authentic carbonara, avoid using cream. The creaminess comes from the eggs and cheese.",
            "Traditional carbonara uses guanciale, but bacon or pancetta are good substitutes.",
          ],
          nutrition: {
            calories: 450,
            protein: "22g",
            carbs: "45g",
            fat: "20g",
            fiber: "2g",
          },
        };
        setRecipe(enhancedRecipe);
      }
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Recipe Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The recipe you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to recipes
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white">
        <div className="container mx-auto py-6 px-4">
          <Link
            to="/"
            className="inline-flex items-center text-white hover:text-blue-200 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to recipes
          </Link>
        </div>
      </div>

      {/* Recipe Hero Section */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 md:pr-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-3">
                {recipe.title}
              </h1>

              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-gray-700">
                    {recipe.rating} ({recipe.reviews} reviews)
                  </span>
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    recipe.difficulty === "Easy"
                      ? "bg-green-100 text-green-800"
                      : recipe.difficulty === "Medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {recipe.difficulty}
                </span>
              </div>

              <p className="text-gray-600 mb-6">{recipe.summary}</p>

              <div className="flex flex-wrap mb-6">
                <div className="flex items-center mr-6 mb-2">
                  <Clock className="h-5 w-5 text-gray-500 mr-1" />
                  <div>
                    <p className="text-xs text-gray-500">Prep Time</p>
                    <p className="font-medium text-gray-700">
                      {recipe.prepTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center mr-6 mb-2">
                  <Clock className="h-5 w-5 text-gray-500 mr-1" />
                  <div>
                    <p className="text-xs text-gray-500">Cook Time</p>
                    <p className="font-medium text-gray-700">
                      {recipe.cookTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  <Users className="h-5 w-5 text-gray-500 mr-1" />
                  <div>
                    <p className="text-xs text-gray-500">Servings</p>
                    <p className="font-medium text-gray-700">
                      {recipe.servings}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 mb-6 md:mb-0">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-64 md:h-80 object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recipe Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row">
          {/* Left Column - Ingredients */}
          <div className="lg:w-1/3 lg:pr-8 mb-8 lg:mb-0">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Ingredients
              </h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></span>
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Nutrition Facts
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-xs text-gray-500">Calories</p>
                    <p className="font-medium">{recipe.nutrition.calories}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-xs text-gray-500">Protein</p>
                    <p className="font-medium">{recipe.nutrition.protein}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-xs text-gray-500">Carbs</p>
                    <p className="font-medium">{recipe.nutrition.carbs}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-xs text-gray-500">Fat</p>
                    <p className="font-medium">{recipe.nutrition.fat}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Instructions */}
          <div className="lg:w-2/3">
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Instructions
              </h2>
              <ol className="space-y-6">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full text-white font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="text-gray-700 pt-1">{step}</div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Chef's Tips
              </h2>
              <ul className="space-y-3">
                {recipe.tips.map((tip, index) => (
                  <li key={index} className="flex items-start text-gray-700">
                    <span className="text-blue-500 font-bold mr-2">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

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

export default RecipeDetail;
