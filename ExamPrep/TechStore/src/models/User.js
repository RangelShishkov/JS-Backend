const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: { type: String, required: [true, "Please input username"], minLength: [2, 'Length must be at least 2 symbols long!'], maxLenghth:20 },
  email: {
    type: String,
    required: [true, "Please input email"],
    unique: [true, "Email already in use"],
    minLength: [10, 'Length must be at least 2 symbols long!'],
  },
  password: { type: String, required: [true, "Please input password"], minLength: [4, 'Length must be at least 4 symbols long!'] },
});

userSchema.path("email").validate(function (emailInput) {
  const email = mongoose.model("User").findOne({ email: emailInput });
  return !!email;
}, "Email already exists!");

userSchema.virtual("repeatPassword").set(function (value) {
  if (value != this.password) {
    throw new Error("Password mismatch!");
  }
});

userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

const User = mongoose.model("User", userSchema);
module.exports = User;
