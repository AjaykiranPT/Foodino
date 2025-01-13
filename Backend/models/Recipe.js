const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: [String], required: true },
    category: { type: String },
    image: { type: String }, 
    rating: { type: Number, default: 0 }, 
    prepTime: { type: Number },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Recipe', RecipeSchema);
