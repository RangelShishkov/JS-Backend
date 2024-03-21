const { URL } = require("../constants");
const mongoose = require("mongoose");

async function dbConnect() {
  await mongoose.connect(URL);
}

module.exports = dbConnect;
