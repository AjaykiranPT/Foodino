const Recipe = require('../models/Recipe');
const cloudinary = require('../config/cloudinary.js')
// Create a new recipe
const createRecipe = async (req, res) => {
  try {
    const { title, description, category, prepTime, ingredients, instructions, createdBy } = req.body;

    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: 'Image is required.' });
    }

    // Upload image to Cloudinary
    const file = req.files.image;
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'recipes',
      resource_type: 'auto'
    });

    const recipe = new Recipe({
      title,
      description,
      category,
      prepTime,
      ingredients: JSON.parse(ingredients),
      instructions: JSON.parse(instructions),
      createdBy,
      image: result.secure_url
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
    const recipes = await Recipe.find().populate('createdBy', 'name role').lean();
    res.status(200).json(recipes);
  } catch (error) {
    console.error('Error retrieving recipes:', error);
    res.status(500).json({ message: 'Failed to retrieve recipes.', error: error.message });
  }
};

// Get a recipe by ID
const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('createdBy', 'name role').lean();
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
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found.' });
    }

    const { title, description, category, prepTime, ingredients, instructions } = req.body;

    recipe.title = title || recipe.title;
    recipe.description = description || recipe.description;
    recipe.category = category || recipe.category;
    recipe.prepTime = prepTime && !isNaN(prepTime) ? prepTime : recipe.prepTime;
    recipe.ingredients = ingredients ? JSON.parse(ingredients) : recipe.ingredients;
    recipe.instructions = instructions ? JSON.parse(instructions) : recipe.instructions;
    recipe.image = req.file ? req.file.path : recipe.image;

    await recipe.save();
    res.status(200).json({ message: 'Recipe updated successfully!', recipe });
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ message: 'Failed to update recipe.', error: error.message });
  }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found.' });
    }
    res.status(200).json({ message: 'Recipe deleted successfully!' });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ message: 'Failed to delete recipe.', error: error.message });
  }
};

module.exports = { createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe };
