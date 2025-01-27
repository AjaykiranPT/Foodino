// routes/ratingRoutes.js
const express = require("express");
const { addOrUpdateRating, getRecipeRating } = require("../controllers/RatingController");

const router = express.Router();

router.post("/rate", addOrUpdateRating);
router.get("/recipe/:recipeId", getRecipeRating);

module.exports = router;
