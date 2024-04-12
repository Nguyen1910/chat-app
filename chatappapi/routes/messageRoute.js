const express = require("express");
const message = require("../models/message");
const conversation = require("../models/conversation");
const catchAsync = require("../middlewares/catchAsync");
const FormatError = require("../middlewares/formatError");
const { io, getReceiver } = require("../socket/socket");
const { pagination } = require("../utils/pagination");
const router = express.Router();
const multer = require("multer");
const { uploadFile } = require("../utils/image");
const upload = multer({});

router.get(
  "/byConversationId/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const { page, limit = 20 } = req.query;
    if (!id) {
      throw new FormatError(400);
    }
    const result = await pagination(
      message,
      {
        find: { conversationId: id },
        sort: { createdAt: "desc" },
        populate: ["creator", "_id full_name avatar"],
      },
      { page, limit }
    );
    res.json({
      success: true,
      ...result,
    });
  })
);

router.post(
  "/",
  catchAsync(async (req, res) => {
    const { message: mess, files, conversationId, status = false } = req.body;
    try {
      if (!conversationId || (!mess && files.length === 0)) {
        res.status(404).json({ message: "Invalid" });
      }

      const currConversation = await conversation.findById(conversationId);
      if (!currConversation) {
        res.status(404).json({ message: "conversation not found" });
      }
      let newMessage = await message.create({
        message: mess,
        images: files.map((file) => file.url),
        creator: req.user._id,
        conversationId,
        status,
      });
      await conversation.findByIdAndUpdate(currConversation._id, {
        latest_message: newMessage,
        updatedAt: new Date(),
      });

      const newMess = await message
        .findById(newMessage._id.toString())
        .populate("creator", "_id full_name avatar");
      const receiverId = currConversation.members.filter((item) => {
        if (item.toString() !== req.user._id) {
          return item;
        }
      });
      if (receiverId.length === 1) {
        io.to(getReceiver(receiverId[0].toString())).emit(
          "newMessage",
          newMess
        );
      }
      // io.to();
      res.json({ success: true, data: newMess });
    } catch (error) {
      res.json({ error });
    }
  })
);

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
