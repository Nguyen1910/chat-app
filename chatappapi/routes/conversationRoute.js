const express = require("express");
const md5 = require("md5");
const bcrypt = require("bcrypt");
const user = require("../models/user");
const { jwtAuth } = require("../middlewares/jwtAuth");
const friend = require("../models/friend");
const FormatError = require("../middlewares/formatError");
const conversation = require("../models/conversation");
const catchAsync = require("../middlewares/catchAsync");
const message = require("../models/message");
const router = express.Router();

router.get(
  "/",
  catchAsync(async (req, res) => {
    const { type = "", inputSearch = "" } = req.query;
    const conversationRecord = await conversation
      .find({
        type: type ? type : { $in: ["private", "group"] },
        members: { $in: [req.user._id] },
        // full_name: { $regex: ".*" + inputSearch + ".*", $options: "i" },
      })
      .sort({
        updatedAt: "desc",
      })
      .populate("latest_message")
      .populate("members", "_id full_name avatar");
    res.json({ success: true, data: conversationRecord });
  })
);

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    if (!id) {
      throw new FormatError(400, "Bad request");
    }
    const conversationRecord = await conversation
      .findOne({ _id: id, members: { $all: [req.user._id] } })
      .populate("latest_message")
      .populate("members", "_id full_name avatar");
    res.json({ success: true, data: conversationRecord });
  })
);

router.post("/", async (req, res) => {
  const { name, members, messages, type } = req.body;
  try {
    if (!members && !type) {
      res.status(404).json({ message: "Invalid" });
    }
    const newConversation = await conversation.create({
      name,
      members,
      messages,
      type,
    });
    res.json({ status: "success", data: newConversation });
  } catch (error) {
    res.json({ error });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: "conversation not found" });
  }
  try {
    await conversation.findByIdAndUpdate(id, {
      ...req.body,
    });
    res.json({
      success: true,
      message: "update connection success",
    });
  } catch (error) {
    res.json({ error });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { status_message, message_id } = req.body;
  if (!id && !message_id) {
    res.status(400).json({ message: "conversation not found" });
  }
  try {
    await message.findByIdAndUpdate(
      message_id,
      {
        status: status_message,
      },
      {
        new: true,
      }
    );

    const conversationRecord = await conversation
      .findById(id)
      .populate("latest_message")
      .populate("members", "_id full_name avatar");

    res.json({
      success: true,
      message: "update connection success",
      data: conversationRecord,
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
