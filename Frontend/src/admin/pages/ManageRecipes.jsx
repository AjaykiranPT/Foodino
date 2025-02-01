import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ManageRecipe.css";
import { Button } from "@mui/material"; // Import Material-UI Button

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
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <img src={recipe.image} alt={recipe.title} className="recipe-image" />
            <div className="recipe-details">
              <h3>{recipe.title}</h3>
              <p>Category: {recipe.category}</p>
              <p>Created By: {recipe.createdBy?.name || "N/A"}</p>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(recipe._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageRecipe;
