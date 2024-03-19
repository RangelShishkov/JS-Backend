const mongoose = require("mongoose");

//Schema
const cubeSchema = new mongoose.Schema({
  name: String,
  description: String,
  difficultyLevel: Number,
});

//Virtual Properties (Calculated Properties)
cubeSchema.virtual("info").get(function () {
  return `Cube model: ${this.name}, difficulty level: ${this.difficultyLevel}.`;
});

//Static Method
cubeSchema.static("getCubesCollection", function () {
  return this.find();
});

//Model
const Cube = mongoose.model("Cube", cubeSchema);
module.exports = Cube;
