import { useEffect, useState } from "react";
import { supabase } from "./utils/supabase";

import "./App.css";
import RecipeTable from "./components/RecipeTable";
import RecipeForm from "./components/RecipeForm";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("")

  useEffect(() => {
    async function getRecipes() {
      const { data } = await supabase.from("recipes").select("*");
      setRecipes(data);
    }
    getRecipes();
  }, [recipes]);

  const addRecipe = async (newRecipe) => {
    const { data, error } = await supabase.from
      // from recipe form submission
      ("recipes").insert([newRecipe]);
    if (error) {
      console.error(error);
    } else if (data) {
      // update state so the new record appears
      setRecipes((prevRecipes) => [...prevRecipes, data[0]]);
    }
  };

  const filteredRecipes = recipes.filter((recipe)=> recipe.ingredients.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="app-container">
      <h1>Recipe List</h1>

      <div className="filter-container">
        <label>Filter by Ingredient: </label>
        <input
          id="ingredient-search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder=""
          className="search-input"
        />
        {search && (
          <button onClick={() => setSearch("")} className="clear-btn">
            Clear
          </button>
        )}
      </div>

      <RecipeTable recipes={filteredRecipes} />
      <hr />
      <RecipeForm addRecipe={addRecipe} />
    </div>
  );
}

export default App;
