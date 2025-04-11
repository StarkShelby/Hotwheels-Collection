const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(cors()); // Allow frontend to fetch data
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

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port  ${PORT} ✅✅`));
