const User = require("../models/User");
const Recipe = require("../models/Recipe");
const UpgradeRequest = require("../models/UpgradeRequest");

// Fetch dashboard stats
const getDashboardStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const recipeCount = await Recipe.countDocuments();
    const pendingRequests = await UpgradeRequest.countDocuments({ status: "Pending" });

    res.status(200).json({ userCount, recipeCount, pendingRequests });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
};

// Manage Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

const updateUser = async (req, res) => {
  const { userId, isBlocked } = req.body;
  try {
    await User.findByIdAndUpdate(userId, { isblocked: isBlocked });
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

// Manage Recipes
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
};

const deleteRecipe = async (req, res) => {
  const { recipeId } = req.params;
  try {
    await Recipe.findByIdAndDelete(recipeId);
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete recipe" });
  }
};

// Manage Upgrade Requests
const getUpgradeRequests = async (req, res) => {
  try {
    // Fetch all upgrade requests
    const requests = await UpgradeRequest.find();

    // Fetch user details for each request
    const userIds = requests.map((request) => request.userId); // Get all user IDs from requests
    const users = await User.find({ _id: { $in: userIds } }); // Fetch corresponding users

    // Map user data to requests
    const requestsWithUserDetails = requests.map((request) => {
      const user = users.find((user) => user._id.toString() === request.userId.toString()); // Match user by ID
      return {
        ...request._doc, // Include all original request fields
        userName: user?.name || "Unknown User",
        userEmail: user?.email || "Unknown Email",
      };
    });

    res.status(200).json(requestsWithUserDetails);
  } catch (error) {
    console.error("Error fetching upgrade requests:", error.message);
    res.status(500).json({ error: "Failed to fetch upgrade requests" });
  }
};



const updateRequestStatus = async (req, res) => {
  const { requestId, status } = req.body;
  try {
    const updatedRequest = await UpgradeRequest.findByIdAndUpdate(requestId, { status }, { new: true });
    if (!updatedRequest) {
      return res.status(404).json({ error: "Request not found" });
    }
    res.status(200).json({ message: "Request status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update request status" });
  }
};


module.exports = {
  getDashboardStats,
  getAllUsers,
  updateUser,
  getAllRecipes,
  deleteRecipe,
  getUpgradeRequests,
  updateRequestStatus,
};
