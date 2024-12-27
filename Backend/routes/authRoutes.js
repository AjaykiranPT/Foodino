const express = require("express");

const { registering, loginUser, getUsers, updateUser, deleteUser} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registering);

router.post("/login", loginUser);

router.get("/users", getUsers);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;