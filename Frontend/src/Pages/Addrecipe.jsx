import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, MenuItem, Alert, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const AddRecipe = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState([]); // Initialize as empty array
  const [steps, setSteps] = useState([]); // Initialize as empty array
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  const handleStepChange = (index, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = value;
    setSteps(updatedSteps);
  };

  const addIngredient = () => setIngredients([...ingredients, '']);
  const addStep = () => setSteps([...steps, '']);

  const removeIngredient = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  const removeStep = (index) => {
    const updatedSteps = steps.filter((_, i) => i !== index);
    setSteps(updatedSteps);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !category || !prepTime || !image || ingredients.length === 0 || steps.length === 0 || ingredients.some(i => !i) || steps.some(s => !s)) {
      setError('All fields are required!');
      return;
    }

    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('User is not authenticated. Please log in again.');
        return;
      }

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('prepTime', prepTime);
      formData.append('image', image);
      formData.append('ingredients', JSON.stringify(ingredients));
      formData.append('steps', JSON.stringify(steps));
      formData.append('createdBy', userId);

      await axios.post('http://localhost:3000/recipes/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess(true);
      setError('');
      navigate('/');
    } catch (err) {
      console.error('Error adding recipe:', err);
      setError('Failed to add recipe. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Add a New Recipe</h1>

      {error && <Alert severity="error" className="mb-4">{error}</Alert>}
      {success && <Alert severity="success" className="mb-4">Recipe added successfully!</Alert>}

      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: 'auto' }}>
        <TextField
          label="Title"
          variant="outlined"
          size="small"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-2"
        />

        <TextField
          label="Description"
          variant="outlined"
          multiline
          rows={2}
          size="small"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-2"
        />

        <TextField
          select
          label="Category"
          variant="outlined"
          size="small"
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mb-2"
        >
          <MenuItem value="Vegetarian">Vegetarian</MenuItem>
          <MenuItem value="Non-Vegetarian">Non-Vegetarian</MenuItem>
          <MenuItem value="Desserts">Desserts</MenuItem>
        </TextField>

        <TextField
          label="Preparation Time (in minutes)"
          variant="outlined"
          type="number"
          size="small"
          fullWidth
          value={prepTime}
          onChange={(e) => setPrepTime(e.target.value)}
          className="mb-2"
        />

        <div className="mb-3">
          <label>Ingredients</label>
          {ingredients.map((ingredient, index) => (
            <Box key={index} display="flex" alignItems="center" className="mb-2">
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                placeholder={`Ingredient ${index + 1}`}
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
              />
              <IconButton onClick={() => removeIngredient(index)} color="secondary" size="small" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button type="button" onClick={addIngredient} variant="outlined" className="mt-2">
            + Add Ingredient
          </Button>
        </div>

        <div className="mb-3">
          <label>Steps</label>
          {steps.map((step, index) => (
            <Box key={index} display="flex" alignItems="center" className="mb-2">
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                placeholder={`Step ${index + 1}`}
                value={step}
                onChange={(e) => handleStepChange(index, e.target.value)}
              />
              <IconButton onClick={() => removeStep(index)} color="secondary" size="small" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button type="button" onClick={addStep} variant="outlined" className="mt-2">
            + Add Step
          </Button>
        </div>

        <div className="mb-3">
          <label htmlFor="imageUpload" className="btn btn-secondary" style={{ width: '100%', borderRadius: '5px' }}>
            {imagePreview ? <img src={imagePreview} alt="Recipe" style={{ width: '100%', borderRadius: '5px' }} /> : 'Upload Image'}
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </div>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Recipe
        </Button>
      </form>
    </div>
  );
};

export default AddRecipe;
