const Recipe = require('../models/Recipe'); 
const fs = require('fs');

// Create a new recipe
const createRecipe = async (req, res) => {
  try {
    const { title, description, category, prepTime, ingredients, steps, createdBy } = req.body;

    // Basic validation
    if (!title || !description || !category || !prepTime || !ingredients || !steps || !createdBy) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Handle image upload
    const imageUrl = req.file?.path || null;
    const recipe = new Recipe({
      title,
      description,
      category,
      prepTime,
      ingredients: JSON.parse(ingredients),
      steps: JSON.parse(steps),
      createdBy,
      image: imageUrl,
    });

    await recipe.save();
    res.status(201).json({ message: 'Recipe created successfully!', recipe });
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ message: 'Failed to create recipe.', error: error.message });
  }
};

// Get all recipes
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    console.error('Error retrieving recipes:', error);
    res.status(500).json({ message: 'Failed to retrieve recipes.', error: error.message });
  }
};

// Get a recipe by ID
const getRecipeById = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found.' });
    }
    res.status(200).json(recipe);
  } catch (error) {
    console.error('Error retrieving recipe:', error);
    res.status(500).json({ message: 'Failed to retrieve recipe.', error: error.message });
  }
};

// Update a recipe
const updateRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedData = req.body;
    if (req.file) {
      updatedData.image = req.file.path; // Update the image URL if a new image is uploaded
    }
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Recipe not found.' });
    }
    res.status(200).json({ message: 'Recipe updated successfully!', recipe: updatedRecipe });
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ message: 'Failed to update recipe.', error: error.message });
  }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(id);
    if (!deletedRecipe) {
      return res.status(404).json({ message: 'Recipe not found.' });
    }
    res.status(200).json({ message: 'Recipe deleted successfully!' });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ message: 'Failed to delete recipe.', error: error.message });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
