const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userScheme = new Schema({ 
  userName: String,
  email: String,
  password: String
});

module.exports = mongoose.model("User", userScheme);