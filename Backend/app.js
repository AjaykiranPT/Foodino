const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const fileUpload = require("express-fileupload");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");

const userRouter = require("./routes/authRoutes");
const recipeRouter = require("./routes/RecipeRoutes");
const uploadRouter = require("./routes/uploadRoutes");
const upgradeRouter = require("./routes/upgradeRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MOG_URL;

if (!mongoUrl) {
  console.error("Missing MOG_URL in environment variables.");
  process.exit(1);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));
app.use(cors());
app.use(helmet());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const broadcastRoutes = require("./routes/broadcastRoutes")(io);

async function main() {
  try {
    await mongoose.connect(mongoUrl);
    console.log("DB CONNECTED");
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
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
app.use("/broadcasts", broadcastRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("new-broadcast", (broadcast) => {
    io.emit("broadcast-received", broadcast);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
