const User = require('../models/User.js');
const bcrypt = require('bcrypt');

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

    // Check if email already exists
    const checkExistence = await User.findOne({ email });
    if (checkExistence) {
      return res.status(409).json({ error: 'This email already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new User({
      name,
      email,
      phonenumber,
      age,
      role,
      password: hashPassword,
    });
    await newUser.save();
    res.status(201).json({ message: 'Account created successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error occurred during registration', details: error.message });
  }
};

// Login a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for empty fields
    if (!email || !password) {
      return res.status(400).send({ message: 'Email and Password are required' });
    }

    // Check if user exists
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate password
    const isValid = await bcrypt.compare(password, userExist.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Generate response
    const userid = userExist._id.toString();
    const userrole = userExist.role;

    // Send response back to the client
    res.status(200).json({ message: 'Login successful', userid, userrole });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'An error occurred during login', error: error.message });
  }
};



// Delete User
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const Showprofile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Add 'await' to properly retrieve the user
    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Use 'return' to prevent further execution
    }

    // Send the user's profile data
    res.status(200).json({
      name: user.name,
      email: user.email,
      phonenumber: user.phonenumber,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error); // Improved error logging
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  const { password } = req.body;

  if (password) {
    req.body.password = await bcrypt.hash(password, 10);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const changepassword = async(req,res) =>{
  const { currentPassword, newPassword } = req.body;
  const userId = req.userId; // Get user ID from the authenticated token

  try {
    const user = await User.findById(userId);
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
};
module.exports = {
  registering,
  loginUser,
  getUsers,
  updateUser,
  deleteUser, 
  Showprofile,
  updateUser,
  changepassword
};
