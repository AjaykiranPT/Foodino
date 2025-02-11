const express = require('express');
const { upload } = require('../controllers/uploadController');
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/RecipeController');

const router = express.Router();

// Recipe routes
router.post('/add', upload.single('image'), (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image uploaded' });
  }
  next();
}, createRecipe);

router.get('/', getAllRecipes);
router.get('/:id', getRecipeById);

router.put('/:id', upload.single('image'), (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image uploaded for update' });
  }
  next();
}, updateRecipe);

router.delete('/:id', deleteRecipe);

module.exports = router;
