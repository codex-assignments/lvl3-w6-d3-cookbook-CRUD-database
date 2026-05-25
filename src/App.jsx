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

  const handleDelete = async (id) => {
    const { error } = await supabase.from("recipes").delete().eq("id", id) // match the id
    
    if (error) {
      console.error(error)
    } else {
      //removes from render
      setRecipes((prev)=>prev.filter((recipe)=>recipe.id !==id))
    }
  
  }
const handleUpdate = async (id, updatedFields) => {

  const { data, error } = await supabase
    .from("recipes")
    .update(updatedFields) //pass in name and ingredients
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating recipe:", error.message);
  } else if (data) {
    // replace data without new useEffect render
    setRecipes((prev) =>
      prev.map((recipe) => (recipe.id === id ? data[0] : recipe)),
    );
  }
};

    

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

      <RecipeTable recipes={filteredRecipes} onDelete={handleDelete} onUpdate={handleUpdate} />
      <hr />
      <RecipeForm addRecipe={addRecipe} />
    </div>
  );
}

export default App;
