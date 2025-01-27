// controllers/ratingController.js
const Rating = require("../models/Rating");
const Recipe = require("../models/Recipe");

// Add or update rating
exports.addOrUpdateRating = async (req, res) => {
  const { userId, recipeId, rating } = req.body;

  if (!rating || rating < 0 || rating > 5) {
    return res.status(400).json({ error: "Rating must be between 0 and 5." });
  }

  try {
    // Check if the user already rated the recipe
    const existingRating = await Rating.findOne({ user: userId, recipe: recipeId });

    if (existingRating) {
      // Update existing rating
      existingRating.rating = rating;
      await existingRating.save();
      return res.status(200).json({ message: "Rating updated successfully." });
    }

    // Add new rating
    const newRating = new Rating({ user: userId, recipe: recipeId, rating });
    await newRating.save();

    res.status(201).json({ message: "Rating added successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add or update rating." });
  }
};

// Get average rating for a recipe
exports.getRecipeRating = async (req, res) => {
  const { recipeId } = req.params;

  try {
    const ratings = await Rating.find({ recipe: recipeId });
    const totalRatings = ratings.length;

    if (totalRatings === 0) {
      return res.status(200).json({ averageRating: 0, totalRatings });
    }

    const averageRating = ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings;
    res.status(200).json({ averageRating, totalRatings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch recipe ratings." });
  }
};
