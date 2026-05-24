import React from "react";

export default function RecipeTable({ recipes }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Ingredients</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => {
            return (
                <tr key={recipe.id}>
                  <td>{recipe.id}</td>
                  <td>{recipe.name}</td>
                  <td>{recipe.ingredients}</td>
                </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
