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
router.post('/add', async (req, res, next) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: 'No image uploaded' });
    }
    next();
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ message: 'File upload failed', error: error.message });
  }
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
