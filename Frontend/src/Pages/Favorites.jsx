import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/Favorite.css'

const Favorites = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId"); // Get the userId from localStorage

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/favorites/${userId}`
        );
        if (response.data && Array.isArray(response.data)) {
          setRecipes(response.data);
        } else {
          setRecipes([]); // Default to empty if response is invalid
        }
      } catch (err) {
        console.error("Error fetching favorite recipes:", err);
        setError("Failed to load your favorite recipes. Please try again later.");
      }
    };

    fetchFavoriteRecipes();
  }, [userId]);

  const handleViewMore = (recipeId) => {
    if (recipeId) navigate(`/recipe/${recipeId}`);
  };

  return (
    <div className="favorites-container">
      <h1>Your Favorite Recipes</h1>
      {error && <p className="error-message">{error}</p>}

      <div className="fav-recipes">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            recipe && (
              <div key={recipe._id} className="recipe-card">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="recipe-image"
                />
                <div className="recipe-details">
                  <h3>{recipe.title}</h3>
                  <p>{recipe.description}</p>
                </div>
                <button  className="fav-button" onClick={() => handleViewMore(recipe._id)}>
                  View More
                </button>
              </div>
            )
          ))
        ) : (
          <p>No favorite recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
