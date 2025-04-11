const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const Car = require("./models/carSchema");
const mongoose = require("mongoose");

// Root route
app.get("/", (req, res) => {
  res.send("Hot Wheels backend is live! 🏎️🔥");
});

// Enable CORS for your frontend
app.use(
  cors({
    origin: "https://hotwheelscollection.vercel.app",
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

app.use(express.static("data")); // Serve the data folder

app.get("/cars", (req, res) => {
  res.sendFile(path.join(__dirname, "data/cars.json"));
});
app.post("/add-to-collection/:id", async (req, res) => {
  const carId = req.params.id;

  try {
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    car.inCollection = true; // Flag this car as "added to collection"
    await car.save();

    res.json({ message: "Car added to collection!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://sharique:sharique@cluster0.skrnl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Database connection error:", err));

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port  ${PORT} ✅✅`));
