import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';
import { Button, Alert } from '@mui/material';

const Home = ({ token }) => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/recipes/');
        setRecipes(response.data);
        setFilteredRecipes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setError('Failed to load recipes. Please try again later.');
        setLoading(false);
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

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h1 className="text-center mb-4">Recipes</h1>

        <div className="mb-4 text-center">
          <div className="d-flex justify-content-between mb-4">
            <div>
              <label className="me-2">Filter by Category:</label>
              <select
                className="form-select"
                value={filterCategory}
                onChange={(e) => handleFilter(e.target.value)}
              >
                <option value="">All</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
                <option value="Desserts">Desserts</option>
              </select>
            </div>
            <div>
              <label className="me-2">Sort by:</label>
              <select
                className="form-select"
                value={sortOption}
                onChange={(e) => handleSort(e.target.value)}
              >
                <option value="">None</option>
                <option value="rating">Rating</option>
                <option value="prepTime">Preparation Time</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <p>Loading recipes...</p>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : filteredRecipes.length === 0 ? (
          <p>No recipes available for the selected category.</p>
        ) : (
          <div className="row">
  {filteredRecipes.map((recipe) => (
    <div
      className="col-md-4 mb-4"
      key={recipe._id}
      onClick={() => navigate(`/recipe/${recipe._id}`)} 
      style={{ cursor: 'pointer' }}
    >
                <div className="card h-100">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{recipe.title}</h5>
                    <p className="card-text">{recipe.description}</p>
                    <p className="card-text">
                      <strong>Category:</strong> {recipe.category}
                    </p>
                    <p className="card-text">
                      <strong>Rating:</strong> {recipe.rating || 'Not Rated'}
                    </p>
                    <p className="card-text">
                      <strong>Preparation Time:</strong> {recipe.prepTime} minutes
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
        }}
      >
        {!token ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/addrecipe')}
          >
            Add Recipe
          </Button>
        ) : (
          <Alert severity="info">Please log in to add your recipes.</Alert>
        )}
      </div>
    </>
  );
};

export default Home;
