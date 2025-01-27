const express = require("express");

const { registering, loginUser, getUsers, deleteUser, Showprofile,updateUser,changepassword} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registering);

router.post("/login", loginUser);

router.get("/users", getUsers);

router.delete("/:id", deleteUser);

router.get("/profile/:id", Showprofile);

router.patch("/profile/:id", updateUser);

router.put("/change-password", changepassword);

module.exports = router;