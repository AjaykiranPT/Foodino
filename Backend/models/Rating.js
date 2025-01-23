const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema(
  {
    recipe: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Recipe", 
      required: true 
    },
    rating: { 
      type: Number, 
      required: true, 
      min: 0, 
      max: 5 
    }, 
    specialRating: { 
      type: Boolean, 
      default: false // Default to `false` instead of `null` for better boolean usage.
    },
    ratedBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    }
  },
  { 
    timestamps: true // Automatically manage `createdAt` and `updatedAt` fields.
  }
);

module.exports = mongoose.model("Rating", RatingSchema);
