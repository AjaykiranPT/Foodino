const mongoose = require("mongoose");

const broadcastSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Change this to match the model name
    required: true,
  },
  content: {
    type: String, // Text message
  },
  mediaUrl: {
    type: String, // Image or Video URL
  },
  mediaType: {
    type: String, // 'image' or 'video'
    enum: ["image", "video", "none"],
    default: "none",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Broadcast = mongoose.model("Broadcast", broadcastSchema);
module.exports = Broadcast;
