const express = require("express");
const { toggleFavorite, getFavoritesByUser } = require("../controllers/favoriteController");

const router = express.Router();

router.post("/toggle", toggleFavorite);
router.get("/user/:userId", getFavoritesByUser); 
router.get("/:userId", getFavoritesByUser); 

module.exports = router;

module.exports = router;
