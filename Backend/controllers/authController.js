const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

// Fetch all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Register a new user
const registering = async (req, res) => {
  try {
    const { name, email, phonenumber, age, role, password } = req.body;

    const checkExistence = await User.findOne({ email });
    if (checkExistence) {
      return res.status(409).json({ error: "This email already exists" });
    }
    

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      email,
      phonenumber,
      age,
      password: hashPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "Account created" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Error occurred during registration" });
  }
};

// Login a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: 'Email and Password are required' });
    }
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(404).json({ message: "User not found"});
    }

    const isValid = await bcrypt.compare(password,userExist.password);
    if (!isValid) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    
    const token = jwt.sign({id:userExist._id,role:userExist.role},process.env.JWT_SECRET);

    return res.status(201).json({ message: "Login successful" ,token});
  
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred during login", error: error.message });
  }
};


// Update User
const updateUser = async (req, res) => {
  try {
    
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Delete User
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  registering,
  loginUser,
  getUsers,
  updateUser,
  deleteUser
};
