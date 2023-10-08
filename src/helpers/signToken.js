const jwt = require("jsonwebtoken");
require("dotenv").config();

const signToken = (data, secret, expiresIn) => {
  return jwt.sign(data, secret, {
    expiresIn,
    algorithm: "HS512",
  });
};

const signAuthToken = (data) => {
  return signToken(data, process.env.JWT_SECRET_KEY, "1h");
};

const signConfirmToken = (data) => {
  return signToken(data, process.env.JWT_SECRET_EMAIL, "3d");
};

module.exports = {
  signAuthToken,
  signConfirmToken,
};
