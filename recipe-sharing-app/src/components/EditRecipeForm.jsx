import { useState } from "react";
import { useRecipeStore } from "./recipeStore";

const EditRecipeForm = ({ recipe, onClose }) => {
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);

  const [formData, setFormData] = useState({
    id: recipe.id,
    title: recipe.title,
    description: recipe.description,
    ingredients: recipe.ingredients || [],
    instructions: recipe.instructions || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleIngredientsChange = (e) => {
    // Split by new lines or commas for ingredients
    const ingredients = e.target.value
      .split(/[\n,]+/)
      .map((item) => item.trim())
      .filter(Boolean);
    setFormData({
      ...formData,
      ingredients,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateRecipe(formData);
    onClose && onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="edit-recipe-form">
      <h2>Edit Recipe</h2>

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="ingredients">
          Ingredients (one per line or comma-separated)
        </label>
        <textarea
          id="ingredients"
          name="ingredients"
          value={formData.ingredients.join("\n")}
          onChange={handleIngredientsChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditRecipeForm;
