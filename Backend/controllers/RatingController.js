const Rating = require("../models/Rating"); // Adjust the path as needed

// Helper: Validate MongoDB ObjectId format
const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

// Create a new rating
const createRating = async (req, res) => {
  try {
    const { Recipe, Rating: ratingValue, specialRating, RatedBy } = req.body;

    // Validate required fields
    if (!Recipe || !RatedBy) {
      return res.status(400).json({ message: "Recipe and RatedBy are required" });
    }

    // Validate rating value
    if (ratingValue < 0 || ratingValue > 5) {
      return res.status(400).json({ message: "Rating must be between 0 and 5" });
    }

    // Create a new rating
    const newRating = new Rating({
      Recipe,
      Rating: ratingValue,
      specialRating,
      RatedBy,
    });

    await newRating.save();
    res.status(201).json({ message: "Rating added successfully", rating: newRating });
  } catch (error) {
    console.error("Error creating rating:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Get all ratings for a specific recipe
const getRatingsForRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;

    // Validate recipeId format
    if (!isValidObjectId(recipeId)) {
      return res.status(400).json({ message: "Invalid recipe ID format" });
    }

    const ratings = await Rating.find({ Recipe: recipeId }).populate("RatedBy", "name email"); // Populate with user info

    if (ratings.length === 0) {
      return res.status(404).json({ message: "No ratings found for this recipe" });
    }

    res.status(200).json(ratings);
  } catch (error) {
    console.error("Error fetching ratings:", error);
    res.status(500).json({ message: "Error fetching ratings", error: error.message });
  }
};

// Delete a rating
const deleteRating = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid rating ID format" });
    }

    const deletedRating = await Rating.findByIdAndDelete(id);
    if (!deletedRating) {
      return res.status(404).json({ message: "Rating not found" });
    }

    res.status(200).json({ message: "Rating deleted successfully", rating: deletedRating });
  } catch (error) {
    console.error("Error deleting rating:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { createRating, getRatingsForRecipe, deleteRating };
