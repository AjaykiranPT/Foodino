import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/recipes/${id}`);
        setRecipe(response.data);
      } catch (err) {
        console.error('Error fetching recipe:', err);
        setError('Failed to load recipe details. Please try again later.');
      }
    };

    fetchRecipe();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h1>{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
      />
      <p>{recipe.description}</p>
      <p><strong>Category:</strong> {recipe.category}</p>
      <p><strong>Rating:</strong> {recipe.rating || 'Not Rated'}</p>
      <p><strong>Preparation Time:</strong> {recipe.prepTime} minutes</p>
    </div>
  );
};

export default Recipe;
