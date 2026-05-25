import React, { useState } from "react";

export default function RecipeTable({ recipes, onUpdate, onDelete }) {
  // select which recipe is being edited
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editIngredients, setEditIngredients] = useState("");

  const startEditing = (recipe) => {
    setEditId(recipe.id);
    setEditName(recipe.name);
    setEditIngredients(recipe.ingredients);
  };

  const handleSave = async (id) => {
    await onUpdate(id, { name: editName, ingredients: editIngredients });
    setEditId(null); // turn off edit mode
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Ingredients</th>
            <th className="actions-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => {
            const isEditing = editId === recipe.id;

            return (
              <tr className="recipe-row" key={recipe.id}>
                <td>{recipe.id}</td>

                {/* name */}
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  ) : (
                    recipe.name
                  )}
                </td>

                {/* ingredients */}
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editIngredients}
                      onChange={(e) => setEditIngredients(e.target.value)}
                    />
                  ) : (
                    recipe.ingredients
                  )}
                </td>

                {/* actions */}
                <td className="action-buttons-cell">
                  {isEditing ? (
                    <>
                      <button
                        className="save-btn"
                        onClick={() => handleSave(recipe.id)}
                      >
                        Save
                      </button>

                      <button
                        className="cancel-btn"
                        onClick={() => setEditId(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="edit-btn"
                        onClick={() => startEditing(recipe)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => onDelete(recipe.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
