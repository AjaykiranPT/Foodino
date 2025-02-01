const Broadcast = require("../models/Broadcast");
const cloudinary = require("../config/cloudinary");

exports.sendBroadcast = async (req, res, io) => {
  try {
    const { content, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    let mediaUrl = "";
    let mediaType = "none";

    if (req.files && req.files.media) {
      const result = await cloudinary.uploader.upload(req.files.media.tempFilePath, {
        resource_type: "auto",
      });
      mediaUrl = result.secure_url;
      mediaType = result.resource_type;
    }

    const newBroadcast = new Broadcast({
      sender: userId,
      content,
      mediaUrl,
      mediaType,
    });

    await newBroadcast.save();

    if (io) {
      io.emit("broadcast-received", newBroadcast);
    }

    res.status(201).json({ message: "Broadcast sent successfully!", broadcast: newBroadcast });
  } catch (error) {
    console.error("Error sending broadcast:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getBroadcasts = async (req, res) => {
  try {
    const broadcasts = await Broadcast.find().populate("sender", "name");
    res.status(200).json(broadcasts);
  } catch (error) {
    console.error("Error fetching broadcasts:", error);
    res.status(500).json({ error: error.message });
  }
};
