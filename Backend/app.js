const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
require('dotenv').config();


const userRouter = require('./routes/authRoutes');
const recipeRouter = require('./routes/RecipeRoutes');
const uploadRouter = require('./routes/uploadRoutes');
const upgradeRouter = require('./routes/upgradeRoutes')
const favoriteRoutes = require("./routes/favoriteRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MOG_URL; 

if (!mongoUrl) {
  console.error("Missing MONGO_URL in environment variables.");
  process.exit(1);
}

app.use(express.json());
app.use(cors());
app.use(helmet());

async function main() {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB CONNECTED");
  } catch (error) {
    console.error("DB CONNECTION ERROR:", error.message);
    process.exit(1);
  }
}

main();

app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});


app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", uptime: process.uptime() });
});

app.use("/auth", userRouter, upgradeRouter);
app.use("/recipes", recipeRouter);
app.use("/upload", uploadRouter);
app.use("/favorites", favoriteRoutes);
app.use("/ratings", ratingRoutes);
app.use("/admin", adminRoutes);



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


