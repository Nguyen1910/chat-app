const express = require("express");
const md5 = require("md5");
const bcrypt = require("bcrypt");
const user = require("../models/user");
const {
  login,
  loginWithGmail,
  refreshToken,
} = require("../controllers/authController");
const router = express.Router();

router.post("/refresh-token", refreshToken);

router.post("/login", login);

router.post("/loginWithGmail", loginWithGmail);

router.get("/:id", async (req, res) => {});

router.post("/", async (req, res) => {
  const { full_name, gender, password, email } = req.body;
  try {
    if (!full_name && !email && !password) {
      res.status(404).json({ message: "Error" });
    }

    const salt = bcrypt.genSaltSync(16);
    const hashPassword = md5(password + salt);
    const newUser = await user.create({
      full_name,
      gender,
      password: hashPassword,
      email,
      salt,
    });
    res.json(newUser);
  } catch (error) {
    res.json({ error });
  }
});

router.put("/:id", async (req, res) => {
  const studentId = req.params.id;
  if (!studentId) {
    res.status(400).json({ message: "student not found" });
  }
  try {
    await student.findByIdAndUpdate(studentId, {
      ...req.body,
    });
    res.json({
      success: true,
      message: "update student success",
    });
  } catch (error) {
    res.json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  const studentId = req.params.id;
  if (!studentId) {
    res.status(400).json({ message: "student not found" });
  }
  try {
    await student.findByIdAndDelete(studentId);
    res.json({ success: true, message: "delete student success" });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
