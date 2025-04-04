import { useRecipeStore } from "./recipeStore";
import { useNavigate } from "react-router-dom";

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recipe?"
    );

    if (confirmDelete) {
      deleteRecipe(recipeId);
      navigate("/recipes"); // Navigate back to recipes list after deletion
    }
  };

  return (
    <button onClick={handleDelete} className="delete-recipe-button">
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;
