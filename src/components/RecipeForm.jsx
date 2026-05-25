import React, { useState } from 'react'

export default function RecipeForm({ addRecipe }) {
  const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState("");
    
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!name.trim() || !ingredients.trim()) {
    alert("Please fill out both fields");
    return;
  }

  await addRecipe({
    name: name.trim(),
    ingredients: ingredients.trim(),
  });

  setTitle("");
  setIngredients("");
};

    return (
      <div className="form-container">
        <h2>Add a New Recipe</h2>
        <form onSubmit={handleSubmit} className="recipe-form">
          <div className="form-group">
            <label>Recipe Name:</label>
            <input
              id="recipe-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name of Recipe"
            />
          </div>

          <div className="form-group">
            <label htmlFor="recipe-ingredients">Ingredients:</label>
            <input
              id="recipe-ingredients"
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="List separated by commas."
            />
          </div>

          <button type="submit" className="submit-btn">
            Add Recipe to List
          </button>
        </form>
      </div>
    );
}
