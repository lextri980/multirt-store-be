const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN, {
    expiresIn: "2h",
  });
};

const generateRememberedToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN, {
    expiresIn: "30d",
  });
};

module.exports = { generateToken, generateRememberedToken };
