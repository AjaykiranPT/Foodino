const express = require("express");

const { registering, loginUser, getUsers, updateUser, deleteUser, Showprofile} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registering);

router.post("/login", loginUser);

router.get("/users", getUsers);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

router.get("/profile/:id", Showprofile);


module.exports = router;