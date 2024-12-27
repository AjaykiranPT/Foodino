const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/authRoutes'); // Import the router
const RecipeRoutes = require('./routes/RecipeRoutes');

const app = express();
const port = 3000;


app.use(express.json());
app.use(cors());


async function main() {
  try {
    await mongoose.connect("mongodb+srv://foodino:foodin01a4j3a7y@appcluster.s4gyq.mongodb.net/foodino", {
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

app.use("/auth", userRouter); 
app.use("/recipe", RecipeRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

