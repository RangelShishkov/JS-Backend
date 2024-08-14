const { sign } = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt");
const { SECRET } = require("../constants");

async function validatePassword(password, userPassword) {
  const isValid = await bcrypt.compare(password, userPassword);

  if (!isValid) {
    throw new Error("Invalid email or password!");
  }
}

exports.register = async (userData) => {
  const user = await User.create(userData);
  const { password } = userData;

  await validatePassword(password, user.password);

  const token = await getToken(user);

  return token;

};

async function getToken(user) {
  const payload = { _id: user._id, email: user.email };
  const token = await jwt.sign(payload, SECRET, { expiresIn: "3d" });

  return token;
}

exports.login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password!");
  }

  await validatePassword(password, user.password);

  const token = await getToken(user);

  return token;
};
