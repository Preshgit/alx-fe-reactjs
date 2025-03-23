import React from "react";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full transform hover:scale-105 transition-transform duration-300">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-bold mb-2 text-gray-800">{recipe.title}</h2>
        <p className="text-gray-600 mb-4 flex-grow">{recipe.summary}</p>
        <div className="flex justify-between text-sm text-gray-500 mb-3">
          <span>Prep: {recipe.prepTime}</span>
          <span>Cook: {recipe.cookTime}</span>
        </div>
        <div className="flex items-center justify-between">
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
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition-colors duration-300">
            View Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
