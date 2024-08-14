const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: [true, "Brand name is required"],
    minLenght: [2, "Length must be atleast 2 symbols long!"],
  },
  model: {
    type: String,
    required: [true, "Model name is required"],
    minLenght: [5, "Length must be atleast 5 symbols long!"],
  },
  hardDisk: {
    type: String,
    required: [true, "Please input hard disk size"],
    minLenght: [5, "Length must be atleast 5 symbols long!"],
  },
  screenSize: {
    type: String,
    required: [true, "Please input screen size"],
    minLenght: [1, "Length must be atleast 1 symbols long!"],
  },
  ram: {
    type: String,
    required: [true, "Please input RAM size"],
    minLenght: [2, "Length must be atleast 2 symbols long!"],
  },
  operatingSystem: {
    type: String,
    required: [true, "Please input operating system"],
    minLenght: [5, "Length must be at least 5 symbols long!"],
    maxLenght: [20, "Length must be max 20 symbols long!"],
  },
  cpu: {
    type: String,
    required: [true, "Please input CPU"],
    minLenght: [10, "Length must be at least 10 symbols long!"],
    maxLenght: [50, "Length must be max 50 symbols long!"],
  },
  gpu: {
    type: String,
    required: [true, "Please input GPU"],
    minLenght: [10, "Length must be at least 10 symbols long!"],
    maxLenght: [50, "Length must be max 50 symbols long!"],
  },
  price: {
    type: Number,
    required: [true, "Please input PRICE"],
    min: [0, "The price must be a positive number"],
  },
  color: {
    type: String,
    required: [true, "Please input COLOR"],
    minLenght: [2, "Length must be at least 2 symbols long!"],
    maxLenght: [10, "Length must be max 10 symbols long!"],
  },
  weight: {
    type: String,
    required: [true, "Please input WEIGHT"],
    minLenght: [1, "Length must be at least 1 symbols long!"],
  },
  image: {
    type: String,
    required: true,
    match: [/^https?:\/\/.+/, "Provide valid device image link!"],
  },
  preferredList: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const Device = mongoose.model("Device", deviceSchema);
module.exports = Device;
