const Favorite = require("../models/Favorite");

// Add or remove favorite
const toggleFavorite = async (req, res) => {
  const { userId, recipeId } = req.body;

  try {
    const existingFavorite = await Favorite.findOne({ user: userId, recipe: recipeId });

    if (existingFavorite) {
      // Remove favorite
      await Favorite.deleteOne({ _id: existingFavorite._id });
      return res.status(200).json({ message: "Recipe removed from favorites." });
    }

    // Add favorite
    const newFavorite = new Favorite({ user: userId, recipe: recipeId });
    await newFavorite.save();
    res.status(201).json({ message: "Recipe added to favorites." });
  } catch (error) {
    console.error("Error toggling favorite:", error);
    res.status(500).json({ error: "Failed to toggle favorite." });
  }
};

// Fetch all favorites of a user
const getFavoritesByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const favorites = await Favorite.find({ user: userId }).populate("recipe");

    if (!favorites || favorites.length === 0) {
      return res.status(200).json([]); // Return an empty array instead of a 404 error
    }

    // Ensure recipes exist before returning them
    const formattedFavorites = favorites
      .map((fav) => fav.recipe)
      .filter((recipe) => recipe !== null);

    res.status(200).json(formattedFavorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ message: "Failed to fetch favorites." });
  }
};


module.exports = { toggleFavorite, getFavoritesByUser };
