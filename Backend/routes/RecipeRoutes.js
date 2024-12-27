const express = require("express");
const router = express.Router();
const { creatingRecipe, deleteRecipe } = require('../controllers/RecipeController');

router.post('/', creatingRecipe);

router.delete('/:id', deleteRecipe);

module.exports = router;