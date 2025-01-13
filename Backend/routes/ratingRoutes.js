const express = require("express");
const {createRating,getRatingsForRecipe,deleteRating} = require("../controllers/RatingController");

const router = express.Router();

// Routes for ratings
router.post("/", createRating); 

router.get("/:recipeId", getRatingsForRecipe); 

router.delete("/:id", deleteRating);

module.exports = router;
