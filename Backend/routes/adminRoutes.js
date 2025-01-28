const express = require("express");
const {
  getDashboardStats,
  getAllUsers,
  updateUser,
  getAllRecipes,
  deleteRecipe,
  getUpgradeRequests,
  updateRequestStatus,
} = require("../controllers/adminController");

const router = express.Router();

// Dashboard Stats
router.get("/stats", getDashboardStats);

// Manage Users
router.get("/users", getAllUsers);
router.put("/users", updateUser);

// Manage Recipes
router.get("/recipes", getAllRecipes);
router.delete("/recipes/:recipeId", deleteRecipe);

// Manage Upgrade Requests
router.get("/requests", getUpgradeRequests);
router.put("/requests", updateRequestStatus);

module.exports = router;
