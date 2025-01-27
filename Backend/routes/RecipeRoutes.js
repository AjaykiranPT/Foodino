const express = require('express');
const { upload } = require('../controllers/uploadController'); // Use the Cloudinary-based middleware
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/RecipeController');

const router = express.Router();

// Recipe routes
router.post('/add', upload.single('image'), createRecipe);
router.get('/', getAllRecipes);
router.get('/:id', getRecipeById);
router.put('/:id', upload.single('image'), updateRecipe);
router.delete('/:id', deleteRecipe);

module.exports = router;
