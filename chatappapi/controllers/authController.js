const md5 = require("md5");
const catchAsync = require("../middlewares/catchAsync");
const FormatError = require("../middlewares/formatError");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const { generateToken, generateRefreshToken } = require("../utils/auth");

exports.refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;

  const userRecord = jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN);

  const currUser = await user.findById(userRecord._id);
  if (!currUser && currUser.refreshToken !== refreshToken) {
    throw new FormatError(400, "Refresh token is expired");
  }
  const token = generateToken({
    _id: currUser._id,
  });

  res.status(200).json({ token });
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    throw new Error("Email, password not empty");
  }
  const currUser = await user?.findOne({ email });
  if (!currUser) {
    throw new FormatError(400, "Not found");
  }
  const checkPassword = md5(password + currUser.salt) === currUser.password;
  if (!checkPassword) {
    throw new FormatError(500, "Password incorrect");
  }
  const token = generateToken({
    _id: currUser._id,
  });

  const refreshToken = generateRefreshToken({
    _id: currUser._id,
  });

  res.status(200).json({
    token,
    refreshToken,
    user: {
      _id: currUser._id,
      full_name: currUser.full_name,
      avatar: currUser.avatar,
    },
  });
});

exports.loginWithGmail = catchAsync(async (req, res) => {
  const { user: u, providerId } = req.body;
  if (!user && !providerId) {
    throw new Error("Login fail");
  }
  let currUser = await user.findOne({ email: u.email });
  if (!currUser) {
    currUser = await user.create({
      full_name: u.displayName,
      email: u.email,
      avatar: u.photoURL,
      providerId,
    });
  }
  const token = generateToken({
    _id: currUser._id,
  });

  const refreshToken = generateRefreshToken({
    _id: currUser._id,
  });

  res
    .status(200)
    .json({
      token,
      refreshToken,
      user: {
        _id: currUser._id,
        full_name: currUser.full_name,
        avatar: currUser.avatar,
      },
    });
});
