const express = require('express');
const { upload } = require('../controllers/uploadController'); // Use the Cloudinary-based middleware
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/RecipeController'); // Adjust the path and destructure functions

const router = express.Router();

// Recipe routes
router.post('/add', upload.single('image'), createRecipe); // Use the standalone function directly
router.get('/', getAllRecipes); // Use the standalone function directly
router.get('/:id', getRecipeById); // Use the standalone function directly
router.put('/:id', upload.single('image'), updateRecipe); // Use the standalone function directly
router.delete('/:id', deleteRecipe); // Use the standalone function directly

module.exports = router;
