import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./RecipeDetails";
import AddRecipeForm from "./components/AddRecipeForm";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="recipe-app">
        <header>
          <h1>Recipe Sharing App</h1>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/recipes" replace />} />
            <Route path="/recipes" element={<RecipeList />} />
            <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
            <Route path="/add-recipe" element={<AddRecipeForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
