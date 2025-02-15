import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import "../styles/ManageRecipe.css";

const ManageRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
          <div
            key={recipe._id}
            className="recipe-card"
            onClick={() => navigate(`/recipe/${recipe._id}`)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={recipe.image || "https://via.placeholder.com/200"}
              alt={recipe.title}
              className="recipe-image"
            />
            <div className="recipe-details">
              <h3>{recipe.title}</h3>
              <p>Category: {recipe.category}</p>
              <p>Created By: {recipe.createdBy?.name || "N/A"}</p>
              <Button
                variant="contained"
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(recipe._id);
                }}
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
