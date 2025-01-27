import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AddRecipe.css';

const AddRecipe = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
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

  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...instructions];
    updatedInstructions[index] = value;
    setInstructions(updatedInstructions);
  };

  const addIngredient = () => setIngredients([...ingredients, '']);
  const addInstruction = () => setInstructions([...instructions, '']);

  const removeIngredient = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  const removeInstruction = (index) => {
    const updatedInstructions = instructions.filter((_, i) => i !== index);
    setInstructions(updatedInstructions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !description ||
      !category ||
      !prepTime ||
      !image ||
      ingredients.length === 0 ||
      instructions.length === 0 ||
      ingredients.some((i) => !i) ||
      instructions.some((s) => !s)
    ) {
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
      formData.append('instructions', JSON.stringify(instructions));
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
    <div className="add-recipe-container">
      <h1 className="add-recipe-title">Add a New Recipe</h1>

      {error && <div className="add-recipe-alert add-recipe-error">{error}</div>}
      {success && <div className="add-recipe-alert add-recipe-success">Recipe added successfully!</div>}

      <form onSubmit={handleSubmit} className="add-recipe-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="add-recipe-input"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="add-recipe-input add-recipe-textarea"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="add-recipe-input"
        >
          <option value="">Select Category</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Non-Vegetarian">Non-Vegetarian</option>
          <option value="Desserts">Desserts</option>
        </select>

        <input
          type="number"
          placeholder="Preparation Time (in minutes)"
          value={prepTime}
          onChange={(e) => setPrepTime(e.target.value)}
          className="add-recipe-input"
        />

        <div className="add-recipe-section">
          <label>Ingredients</label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="add-recipe-step">
              <input
                type="text"
                placeholder={`Ingredient ${index + 1}`}
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className="add-recipe-input"
              />
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="add-recipe-delete-btn"
              >
                &times;
              </button>
            </div>
          ))}
          <button type="button" onClick={addIngredient} className="add-recipe-add-btn">
            + Add Ingredient
          </button>
        </div>

        <div className="add-recipe-section">
          <label>Instructions</label>
          {instructions.map((instruction, index) => (
            <div key={index} className="add-recipe-step">
              <input
                type="text"
                placeholder={`Step ${index + 1}`}
                value={instruction}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
                className="add-recipe-input"
              />
              <button
                type="button"
                onClick={() => removeInstruction(index)}
                className="add-recipe-delete-btn"
              >
                &times;
              </button>
            </div>
          ))}
          <button type="button" onClick={addInstruction} className="add-recipe-add-btn">
            + Add Instruction
          </button>
        </div>

        <div className="add-recipe-image-upload">
          <label htmlFor="imageUpload" className="add-recipe-upload-label">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="add-recipe-image-preview" />
            ) : (
              'Upload Image'
            )}
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="add-recipe-file-input"
          />
        </div>

        <button type="submit" className="add-recipe-submit-btn">
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
