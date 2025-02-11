const Rating = require("../models/Rating");
const Recipe = require("../models/Recipe");

// Function to calculate and update the recipe's average rating
const updateRecipeRating = async (recipeId) => {
  try {
    const ratings = await Rating.find({ recipe: recipeId });
    const totalRatings = ratings.length;

    if (totalRatings === 0) {
      await Recipe.findByIdAndUpdate(recipeId, { rating: 0 });
      return;
    }

    const averageRating = ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings;
    await Recipe.findByIdAndUpdate(recipeId, { rating: averageRating });
  } catch (error) {
    console.error("Error updating recipe rating:", error);
  }
};

// Add or update rating and auto-update recipe's average rating
exports.addOrUpdateRating = async (req, res) => {
  const { userId, recipeId, rating } = req.body;

  if (!rating || rating < 0 || rating > 5) {
    return res.status(400).json({ error: "Rating must be between 0 and 5." });
  }

  try {
    // Check if the user already rated the recipe
    const existingRating = await Rating.findOne({ user: userId, recipe: recipeId });

    if (existingRating) {
      existingRating.rating = rating;
      await existingRating.save();
    } else {
      const newRating = new Rating({ user: userId, recipe: recipeId, rating });
      await newRating.save();
    }

    // Auto-update the recipe's rating
    await updateRecipeRating(recipeId);

    res.status(200).json({ message: "Rating updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add or update rating." });
  }
};

// Get average rating for a recipe
exports.getRecipeRating = async (req, res) => {
  const { recipeId } = req.params;

  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found." });
    }

    res.status(200).json({ averageRating: recipe.rating });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch recipe ratings." });
  }
};
