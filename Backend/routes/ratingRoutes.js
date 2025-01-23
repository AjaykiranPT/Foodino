const express = require("express");
const { createRating, getRatingsForRecipe, deleteRating } = require("../controllers/RatingController");

const router = express.Router();

// Base route for ratings
// Create a new rating for a recipe
router.post("/", createRating); 

// Get all ratings for a specific recipe
router.get("/recipe/:recipeId", getRatingsForRecipe); 

// Delete a specific rating by ID
router.delete("/:id", deleteRating);

module.exports = router;
