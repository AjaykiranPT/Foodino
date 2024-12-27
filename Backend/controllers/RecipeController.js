const Recipe = require("../models/Recipe.js");

const creatingRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, createdBy } = req.body;

    if (!title || !ingredients || !instructions || !createdBy) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (
      typeof title !== "string" ||
      !Array.isArray(ingredients) ||
      !Array.isArray(instructions) ||
      typeof createdBy !== "string"
    ) {
      return res.status(400).json({ message: "Invalid data types provided" });
    }

    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      createdBy,
    });

    await newRecipe.save();

    res.status(201).json({ message: "Recipe added successfully", recipe: newRecipe });
  } catch (error) {
    console.error("Error creating recipe:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    return res.status(200).json({ message: "Recipe deleted successfully", recipe: deletedRecipe });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { creatingRecipe, deleteRecipe };
