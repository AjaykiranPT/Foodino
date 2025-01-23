const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'] },
  ingredients: { type: [String], required: [true, 'Ingredients are required'] },
  instructions: { type: [String], required: [true, 'Instructions are required'] },
  category: { type: String, required: [true, 'Category is required'] },
  image: { type: String },
  prepTime: { type: Number },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'CreatedBy is required'] },
  rating: { type: Number, default: 0 },
}, { timestamps: true });


const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
