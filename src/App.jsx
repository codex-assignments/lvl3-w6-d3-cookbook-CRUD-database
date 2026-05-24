import { useEffect, useState } from "react";
import { supabase } from "./utils/supabase";

import "./App.css";
import RecipeTable from "./components/RecipeTable";

function App() {
  const [recipes,setRecipes] = useState([])

  useEffect(() => {
    async function getRecipes() {
      const { data } = await supabase.from("recipes").select("*")
      setRecipes(data)
    }
    getRecipes()
  },[])

  return (
    <>
      <h1>Recipe List</h1>
      <RecipeTable recipes={recipes} />
    </>
  );
}

export default App;
