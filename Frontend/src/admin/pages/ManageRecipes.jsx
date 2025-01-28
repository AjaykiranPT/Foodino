import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ManageRecipe.css";

const ManageRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/admin/recipes");
        setRecipes(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch recipes");
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleDelete = async (recipeId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/admin/recipes/${recipeId}`);
      setRecipes((prev) => prev.filter((recipe) => recipe._id !== recipeId));
      alert("Recipe deleted successfully!");
    } catch (err) {
      console.error("Error deleting recipe:", err);
      alert("Failed to delete recipe. Please try again.");
    }
  };

  if (loading) {
    return <div className="loading">Loading recipes...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="manage-recipe">
      <h2>Manage Recipes</h2>
      <table className="recipe-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <tr key={recipe._id}>
              <td>{recipe.title}</td>
              <td>{recipe.category}</td>
              <td>{recipe.createdBy?.name || "N/A"}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(recipe._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageRecipe;
