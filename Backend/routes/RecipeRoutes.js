const express = require("express");
const router = express.Router();
const {getRecipes,createRecipe,deleteRecipe,getRecipeById} = require('../controllers/RecipeController');

const {verifyToken} = require('../middlewares/authMiddleware');

router.get('/', getRecipes);
router.post('/', createRecipe);
router.delete('/:id', deleteRecipe);
router.get("/:id", getRecipeById);

module.exports = router;
