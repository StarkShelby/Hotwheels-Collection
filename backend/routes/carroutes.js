const express = require("express");
const router = express.Router(); // Create router instance

const Car = require("../models/carSchema");

// Define the route
router.get("/cars", async (req, res) => {
  try {
    console.log("Fetching cars from database...");
    const cars = await Car.find();
    console.log("Cars found:", cars);
    res.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Export the router so it can be used in other files
module.exports = router;
