const UpgradeRequest = require("../models/UpgradeRequest");
const cloudinary = require("../config/cloudinary");

// Submit an upgrade request
const submitUpgradeRequest = async (req, res) => {
  try {
    const { userId } = req.body;
    const proofFile = req.file; // Assuming proof file is uploaded

    if (!userId || !proofFile) {
      return res.status(400).json({ message: "User ID and proof file are required" });
    }

    // Upload proof to Cloudinary
    let uploadResult;
    try {
      uploadResult = await cloudinary.uploader.upload(proofFile.path);
    } catch (cloudinaryError) {
      console.error("Error uploading to Cloudinary:", cloudinaryError);
      return res.status(500).json({ message: "Error uploading proof file" });
    }

    // Save the request to the database
    const newRequest = new UpgradeRequest({
      userId,
      proof: uploadResult.secure_url,
    });

    await newRequest.save();
    res.status(201).json({ message: "Upgrade request submitted successfully!" });
  } catch (error) {
    console.error("Error submitting upgrade request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Admin: Get all requests
const getAllUpgradeRequests = async (req, res) => {
  try {
    const requests = await UpgradeRequest.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 }); // Sort by most recent requests
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching upgrade requests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Admin: Approve/Reject a request
const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const request = await UpgradeRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({ message: `Request ${status.toLowerCase()} successfully` });
  } catch (error) {
    console.error("Error updating request status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  submitUpgradeRequest,
  getAllUpgradeRequests,
  updateRequestStatus,
};
