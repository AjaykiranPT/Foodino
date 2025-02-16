import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AddRecipe.css';
import { IoIosAddCircle } from "react-icons/io";


const AddRecipe = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState(['']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(''); // Placeholder image

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
  
    if (!title.trim() || !description.trim() || !category || !prepTime || !image) {
      setError('All fields are required!');
      setTimeout(() => setError(''), 3000);
      return;
    }
  
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('User is not authenticated. Please log in again.');
        return;
      }
  
      const formData = new FormData();
      formData.append('image', image);
      formData.append('title', title.trim());
      formData.append('description', description.trim());
      formData.append('category', category);
      formData.append('prepTime', prepTime);
      // Convert arrays to strings before appending
      formData.append('ingredients', JSON.stringify(ingredients.filter(i => i.trim())));
      formData.append('instructions', JSON.stringify(instructions.filter(i => i.trim())));
      formData.append('createdBy', userId);
  
      const response = await axios.post('http://localhost:3000/recipes/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      });
  
      if (response.status === 201) {
        setSuccess(true);
        setError('');
        setTimeout(() => navigate('/explore'), 2000);
      }
    } catch (err) {
      console.error('Error adding recipe:', err);
      setError('Failed to add recipe. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };
  
  
  

  return (
    <div className="add-recipe-container">
      <h1 className="add-recipe-title">Add a New Recipe</h1>

      {error && <div className="add-recipe-alert add-recipe-error">{error}</div>}
      {success && <div className="add-recipe-alert add-recipe-success">Recipe added successfully!</div>}

      <form onSubmit={handleSubmit} className="add-recipe-form">
        <div className="add-recipe-header">
          <div className="add-recipe-info">
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
          </div>

          <div className="add-recipe-image-upload">
            <label htmlFor="imageUpload" className="add-recipe-upload-label">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="add-recipe-image-preview" />
              ) : (
                <div className="add-recipe-placeholder">Select Image</div>
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

        </div>

        <div className="add-recipe-section">
          <label>Ingredients</label>
          <div className="add-recipe-ingredients">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="add-recipe-ingredient">
                <input
                  type="text"
                  placeholder={`Ingredient ${index + 1}`}
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                  className="add-recipe-input ingredient-input"
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
              <IoIosAddCircle size={'2em'}/>
            </button>
          </div>
        </div>

        <div className="add-recipe-section">
          <label>Instructions</label>
          <div className="add-recipe-steps">
            {instructions.map((instruction, index) => (
              <div key={index} className="add-recipe-step">
                <span className="instruction-index">{index + 1}</span>
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
              <IoIosAddCircle size={'3em'}/>
            </button> 
          </div>
        </div>

        <button type="submit" className="add-recipe-submit-btn">
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
