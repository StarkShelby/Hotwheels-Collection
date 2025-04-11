const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  id: Number,
  name: String,
  year: Number,
  series: String,
  image: String,
  category: String,
  // Ensure this field exists
  ownedByUser: { type: Boolean, default: false }, // Ensure this field exists
  inCollection: { type: Boolean, default: false }, // Ensure this field exists
});

module.exports = mongoose.model("Car", carSchema);
