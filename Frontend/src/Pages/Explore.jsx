  import React, { useState, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import axios from 'axios';
  import '../styles/Explore.css'; // Import CSS

  const Explore = () => {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [filterCategory, setFilterCategory] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [error, setError] = useState('');
    const [hoveredRecipe, setHoveredRecipe] = useState(null);
    const navigate = useNavigate();

    const userRole = localStorage.getItem('userRole');

    useEffect(() => {
      const fetchRecipes = async () => {
        try {
          const response = await axios.get('http://localhost:3000/recipes/');
          setRecipes(response.data);
          setFilteredRecipes(response.data);
        } catch (err) {
          console.error('Error fetching recipes:', err);
          setError('Failed to load recipes. Please try again later.');
        }
      };

      fetchRecipes();
    }, []);

    const handleFilter = (category) => {
      setFilterCategory(category);
      const filtered = category
        ? recipes.filter((recipe) => recipe.category === category)
        : recipes;
      setFilteredRecipes(filtered);
    };

    const handleSort = (option) => {
      setSortOption(option);
      const sorted = [...filteredRecipes].sort((a, b) => {
        if (option === 'rating') return b.rating - a.rating;
        if (option === 'prepTime') return a.prepTime - b.prepTime;
        return 0;
      });
      setFilteredRecipes(sorted);
    };

    const handleHover = (id) => {
      setHoveredRecipe(id);
    };

    return (
      <div className="explore-container">
        <h1>Explore Recipes</h1>

        {/* Main content area for recipes */}
        <div className="main-content">
          <div className="recipes">
            {filteredRecipes.map((recipe) => (
              <div className="recipe-card" key={recipe._id}
                onMouseEnter={() => handleHover(recipe._id)}
                onMouseLeave={() => handleHover(null)}
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="recipe-image"
                />
                <div className="recipe-details">
                  <h5 className="recipe-title">{recipe.title}</h5>
                  <p className="recipe-description">{recipe.description}</p>
                  <p className="recipe-category"><strong>Category:</strong> {recipe.category}</p>
                  <p className="recipe-rating"><strong>Rating:</strong> {recipe.rating || 'Not Rated'}</p>
                  <p className="recipe-prepTime"><strong>Preparation Time:</strong> {recipe.prepTime} minutes</p>
                </div>
                {hoveredRecipe === recipe._id && (
                  <button
                    className="view-more-button"
                    onClick={() => navigate(`/recipe/${recipe._id}`)}
                  >
                    View More
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Sidebar for filter and sort */}
          <div className="sidebar">
            <div className="filter-sort">
              <div className="filter-buttons">
                <span className="label">Filter:</span>
                <button 
                  className={`filter-button ${filterCategory === '' ? 'active' : ''}`} 
                  onClick={() => handleFilter('')}
                >
                  All
                </button>
                <button 
                  className={`filter-button ${filterCategory === 'Vegetarian' ? 'active' : ''}`} 
                  onClick={() => handleFilter('Vegetarian')}
                >
                  Veg
                </button>
                <button 
                  className={`filter-button ${filterCategory === 'Non-Vegetarian' ? 'active' : ''}`} 
                  onClick={() => handleFilter('Non-Vegetarian')}
                >
                  Non-Veg
                </button>
                <button 
                  className={`filter-button ${filterCategory === 'Desserts' ? 'active' : ''}`} 
                  onClick={() => handleFilter('Desserts')}
                >
                  Desserts
                </button>
              </div>

              <div className="sort-buttons">
                <span className="label">Sort:</span>
                <button 
                  className={`sort-button ${sortOption === '' ? 'active' : ''}`} 
                  onClick={() => handleSort('')}
                >
                  None
                </button>
                <button 
                  className={`sort-button ${sortOption === 'rating' ? 'active' : ''}`} 
                  onClick={() => handleSort('rating')}
                >
                  Rating
                </button>
                <button 
                  className={`sort-button ${sortOption === 'prepTime' ? 'active' : ''}`} 
                  onClick={() => handleSort('prepTime')}
                >
                  Prep Time
                </button>
              </div>
              {/* Add Recipe Button */}
              {userRole && (
              <button
                className="add-recipe-button"
                onClick={() => navigate('/addrecipe')}
              > 
                Add Recipe
              </button>
              )}
            </div>
          </div>
        </div>

        

        {error && <div className="error-message">{error}</div>}
      </div>
    );
  };

  export default Explore;
