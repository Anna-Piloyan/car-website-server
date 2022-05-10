const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const carScheme = new Schema({ 
  model: String,
  price: Number,
  description: String,
  image: String
});

module.exports = mongoose.model("Car", carScheme);