import React from "react";
import RecipeList from "./components/RecipeList";
import AddRecipeForm from "./components/AddRecipeForm";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Recipe Sharing App</h1>
      </header>

      <main className="app-main">
        <AddRecipeForm />
        <RecipeList />
      </main>
    </div>
  );
}

export default App;
