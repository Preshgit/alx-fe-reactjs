import React, { useState } from "react";
import useRecipeStore from "./recipeStore";

const AddRecipeForm = () => {
  // Access the addRecipe action from the Zustand store
  const addRecipe = useRecipeStore((state) => state.addRecipe);

  // Local state for form inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate input fields
    if (!title.trim() || !description.trim()) {
      alert("Please fill in all fields");
      return;
    }

    // Create a new recipe with a unique ID using timestamp
    const newRecipe = {
      id: Date.now(),
      title,
      description,
    };

    // Add the recipe to the store
    addRecipe(newRecipe);

    // Reset form fields
    setTitle("");
    setDescription("");
  };

  return (
    <div className="add-recipe-form">
      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Recipe Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter recipe title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Recipe Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter recipe description"
            rows="4"
          />
        </div>

        <button type="submit" className="submit-button">
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
