const User = require("../models/User");
const Recipe = require("../models/Recipe");
const UpgradeRequest = require("../models/UpgradeRequest");

// Fetch dashboard stats
const getDashboardStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const recipeCount = await Recipe.countDocuments();
    const pendingRequests = await UpgradeRequest.countDocuments({ status: "Pending" });

    // Get today's date at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Count today's users
    const todayUsers = await User.countDocuments({ createdAt: { $gte: today } });

    // Count today's recipes
    const todayRecipes = await Recipe.countDocuments({ createdAt: { $gte: today } });

    res.status(200).json({ userCount, recipeCount, pendingRequests, todayRecipes, todayUsers });
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
    const recipes = await Recipe.find().populate('createdBy', 'name');
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
    const requests = await UpgradeRequest.find().populate('userId', 'name email');

    // Fetch user details for each request
    const userIds = requests.map((request) => request.userId);
    const users = await User.find({ _id: { $in: userIds } });

    // Map user data to requests
    const requestsWithUserDetails = requests.map((request) => {
      const user = users.find((user) => user._id.toString() === request.userId.toString());
      return {
        ...request._doc,
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
  const { requestId, status, userId } = req.body;
  try {
    let updatedUser;
    if (status === 'Approved') {
      updatedUser = await User.findByIdAndUpdate(userId, { role: 'masterchef' });
    }
    
    let updatedRequest;
    if (updatedUser) {
      updatedRequest = await UpgradeRequest.findByIdAndUpdate(requestId, { status }, { new: true });
    }

    if (!updatedRequest) {
      return res.status(404).json({ error: "Request not found" });
    }

    res.status(200).json({ message: "Request status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update request status" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ message: "User successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
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
  deleteUser
};
