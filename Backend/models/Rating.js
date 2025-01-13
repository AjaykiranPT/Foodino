const mongoose = require("mongoose"); 

const RatingSchema = mongoose.Schema(
  {
    Recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
    Rating: { type: Number, min: 0, max: 5 },
    specialRating: { type: Boolean, default: null },
    RatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true } 
);

module.exports = mongoose.model('Rating', RatingSchema);
