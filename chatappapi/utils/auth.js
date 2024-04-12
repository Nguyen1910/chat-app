const jwt = require("jsonwebtoken");

exports.generateToken = (data) => {
  return jwt.sign(data, process.env.SECRET_JWT, { expiresIn: "24h" });
};

exports.generateRefreshToken = (data) => {
  return jwt.sign(data, process.env.SECRET_REFRESH_TOKEN, { expiresIn: "7d" });
};
