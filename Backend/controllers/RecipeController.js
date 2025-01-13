const Recipe = require("../models/Recipe.js");

const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ message: "Error fetching recipes", error: error.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid recipe ID format" });
    }

    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, category, prepTime, createdBy } = req.body;
    const image = req.file ? req.file.path : null; // Get image URL from multer

    // Validate required fields
    if (!title || !ingredients || !instructions || !createdBy) {
      return res.status(400).json({ message: "Title, ingredients, instructions, and createdBy are required" });
    }

    // Validate data types
    if (
      typeof title !== "string" ||
      !Array.isArray(ingredients) ||
      !Array.isArray(instructions) ||
      typeof createdBy !== "string" ||
      (prepTime && typeof prepTime !== "number")
    ) {
      return res.status(400).json({ message: "Invalid data types provided" });
    }

    // Create new recipe
    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      category,
      image,
      prepTime,
      createdBy,
    });

    await newRecipe.save();

    res.status(201).json({ message: "Recipe added successfully", recipe: newRecipe });
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid recipe ID format" });
    }

    const deletedRecipe = await Recipe.findByIdAndDelete(id);
    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({ message: "Recipe deleted successfully", recipe: deletedRecipe });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { getRecipes, getRecipeById, createRecipe, deleteRecipe };
