import React, { useState, useEffect } from "react";
import { ChevronDown, PlusCircle, X } from "lucide-react";

const AddRecipeForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    cookTime: "",
    prepTime: "",
    servings: "",
    difficulty: "medium",
    category: "",
    ingredients: ["", ""],
    steps: [""],
    image: null,
  });

  // Validation state
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle ingredient changes
  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index] = value;
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  // Add ingredient field
  const addIngredient = () => {
    setFormData({ ...formData, ingredients: [...formData.ingredients, ""] });
  };

  // Remove ingredient field
  const removeIngredient = (index) => {
    if (formData.ingredients.length <= 2) return;
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients.splice(index, 1);
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  // Handle step changes
  const handleStepChange = (index, value) => {
    const updatedSteps = [...formData.steps];
    updatedSteps[index] = value;
    setFormData({ ...formData, steps: updatedSteps });
  };

  // Add step field
  const addStep = () => {
    setFormData({ ...formData, steps: [...formData.steps, ""] });
  };

  // Remove step field
  const removeStep = (index) => {
    if (formData.steps.length <= 1) return;
    const updatedSteps = [...formData.steps];
    updatedSteps.splice(index, 1);
    setFormData({ ...formData, steps: updatedSteps });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Check title
    if (!formData.title.trim()) {
      newErrors.title = "Recipe title is required";
    }

    // Check description
    if (!formData.description.trim()) {
      newErrors.description = "Recipe description is required";
    }

    // Check cook time
    if (!formData.cookTime.trim()) {
      newErrors.cookTime = "Cook time is required";
    }

    // Check prep time
    if (!formData.prepTime.trim()) {
      newErrors.prepTime = "Prep time is required";
    }

    // Check servings
    if (!formData.servings.trim()) {
      newErrors.servings = "Number of servings is required";
    }

    // Check category
    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    // Check ingredients
    const validIngredients = formData.ingredients.filter(
      (ing) => ing.trim() !== ""
    );
    if (validIngredients.length < 2) {
      newErrors.ingredients = "At least 2 ingredients are required";
    }

    // Check steps
    const validSteps = formData.steps.filter((step) => step.trim() !== "");
    if (validSteps.length < 1) {
      newErrors.steps = "At least 1 preparation step is required";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitting(true);

      // Simulate API call
      setTimeout(() => {
        console.log("Form submitted successfully:", formData);

        // Reset form
        setFormData({
          title: "",
          description: "",
          cookTime: "",
          prepTime: "",
          servings: "",
          difficulty: "medium",
          category: "",
          ingredients: ["", ""],
          steps: [""],
          image: null,
        });
        setPreviewImage(null);
        setSubmitting(false);

        // You would typically redirect or show a success message here
        alert("Recipe added successfully!");
      }, 1000);
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Recipe</h2>

      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Basic Information
          </h3>

          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-medium mb-2"
            >
              Recipe Title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter recipe title"
            />
            {errors.title && (
              <p className="text-red-500 mt-1 text-sm">{errors.title}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Description*
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Briefly describe your recipe"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 mt-1 text-sm">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label
                htmlFor="prepTime"
                className="block text-gray-700 font-medium mb-2"
              >
                Prep Time (minutes)*
              </label>
              <input
                type="number"
                id="prepTime"
                name="prepTime"
                value={formData.prepTime}
                onChange={handleChange}
                min="0"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.prepTime ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="30"
              />
              {errors.prepTime && (
                <p className="text-red-500 mt-1 text-sm">{errors.prepTime}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="cookTime"
                className="block text-gray-700 font-medium mb-2"
              >
                Cook Time (minutes)*
              </label>
              <input
                type="number"
                id="cookTime"
                name="cookTime"
                value={formData.cookTime}
                onChange={handleChange}
                min="0"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.cookTime ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="45"
              />
              {errors.cookTime && (
                <p className="text-red-500 mt-1 text-sm">{errors.cookTime}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="servings"
                className="block text-gray-700 font-medium mb-2"
              >
                Servings*
              </label>
              <input
                type="number"
                id="servings"
                name="servings"
                value={formData.servings}
                onChange={handleChange}
                min="1"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.servings ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="4"
              />
              {errors.servings && (
                <p className="text-red-500 mt-1 text-sm">{errors.servings}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="difficulty"
                className="block text-gray-700 font-medium mb-2"
              >
                Difficulty
              </label>
              <div className="relative">
                <select
                  id="difficulty"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-gray-700 font-medium mb-2"
              >
                Category*
              </label>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`appearance-none w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select a category</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="dessert">Dessert</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="quick-meals">Quick Meals</option>
                  <option value="healthy">Healthy</option>
                  <option value="special-occasion">Special Occasion</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              {errors.category && (
                <p className="text-red-500 mt-1 text-sm">{errors.category}</p>
              )}
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Ingredients*
          </h3>

          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-start mb-2">
              <div className="flex-grow">
                <div className="flex">
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) =>
                      handleIngredientChange(index, e.target.value)
                    }
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      errors.ingredients ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder={`Ingredient ${index + 1} (e.g., 2 cups flour)`}
                  />
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="ml-2 text-gray-400 hover:text-red-500 focus:outline-none"
                    disabled={formData.ingredients.length <= 2}
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {errors.ingredients && (
            <p className="text-red-500 mt-1 mb-2 text-sm">
              {errors.ingredients}
            </p>
          )}

          <button
            type="button"
            onClick={addIngredient}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium focus:outline-none mt-2"
          >
            <PlusCircle className="h-5 w-5 mr-1" /> Add Ingredient
          </button>
        </div>

        {/* Preparation Steps */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Preparation Steps*
          </h3>

          {formData.steps.map((step, index) => (
            <div key={index} className="flex items-start mb-4">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-2">
                {index + 1}
              </span>
              <div className="flex-grow">
                <div className="flex">
                  <textarea
                    value={step}
                    onChange={(e) => handleStepChange(index, e.target.value)}
                    rows="2"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      errors.steps ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder={`Step ${index + 1} instructions`}
                  ></textarea>
                  <button
                    type="button"
                    onClick={() => removeStep(index)}
                    className="ml-2 text-gray-400 hover:text-red-500 focus:outline-none"
                    disabled={formData.steps.length <= 1}
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {errors.steps && (
            <p className="text-red-500 mt-1 mb-2 text-sm">{errors.steps}</p>
          )}

          <button
            type="button"
            onClick={addStep}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium focus:outline-none mt-2"
          >
            <PlusCircle className="h-5 w-5 mr-1" /> Add Step
          </button>
        </div>

        {/* Recipe Image */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Recipe Image
          </h3>

          <div className="flex flex-col md:flex-row items-start">
            <div className="w-full md:w-1/2 mb-4 md:mb-0 md:mr-4">
              <label className="block text-gray-700 font-medium mb-2">
                Upload Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors">
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label htmlFor="image" className="cursor-pointer">
                  <div className="text-blue-600 mb-2">
                    <PlusCircle className="h-12 w-12 mx-auto" />
                  </div>
                  <p className="text-gray-700 font-medium">
                    Click to upload image
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    JPG, PNG or GIF (max 5MB)
                  </p>
                </label>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <label className="block text-gray-700 font-medium mb-2">
                Image Preview
              </label>
              <div className="border border-gray-300 rounded-lg h-64 overflow-hidden bg-gray-100 flex items-center justify-center">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Recipe preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="text-gray-500">No image selected</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {submitting ? "Submitting..." : "Add Recipe"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipeForm;
