const express = require("express");
const md5 = require("md5");
const bcrypt = require("bcrypt");
const user = require("../models/user");
const { jwtAuth } = require("../middlewares/jwtAuth");
const router = express.Router();

router.get("/profile", jwtAuth, async (req, res) => {
  const { _id, email, full_name, avatar, gender } = await user?.findOne({
    _id: req.user._id,
  });
  res.json({ _id, email, full_name, avatar, gender });
});

router.get("/:id", async (req, res) => {
  // res.json({ success: true, data: { student: students } });
});

router.get("/", async (req, res) => {
  const { full_name = "" } = req.query;
  const { _id } = req.user;

  const userRecords = await user
    .find({
      full_name: { $regex: ".*" + full_name + ".*", $options: "i" },
      _id: { $ne: _id },
    })
    .select("full_name avatar");

  res.json({ data: userRecords, status: true });
});

router.post("/", async (req, res) => {
  const { full_name, gender, password, email, birthday } = req.body;
  try {
    if (!full_name && !email && !password) {
      res.status(404).json({ message: "Error" });
    }

    const salt = bcrypt.genSaltSync(16);
    const hashPassword = md5(password + salt);
    const newUser = await user?.create({
      full_name,
      gender,
      password: hashPassword,
      email,
      salt,
      birthday: birthday || null,
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
