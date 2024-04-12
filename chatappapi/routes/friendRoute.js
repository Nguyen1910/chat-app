const express = require("express");
const md5 = require("md5");
const bcrypt = require("bcrypt");
const user = require("../models/user");
const { jwtAuth } = require("../middlewares/jwtAuth");
const friend = require("../models/friend");
const FormatError = require("../middlewares/formatError");
const { getReceiver, sendData, io } = require("../socket/socket");
const router = express.Router();
const conversation = require("../models/conversation");
const catchAsync = require("../middlewares/catchAsync");

router.get("/byUser", async (req, res) => {
  const userId = req.user._id;
  const friendRecords = await friend
    .find({ userId })
    .populate("friendId", "_id full_name avatar")
    .exec();

  res.json({
    success: true,
    data: friendRecords.map((f) => ({
      ...f.friendId._doc,
      confirm: f.confirm,
    })),
  });
});

router.get("/friendRequest", async (req, res) => {
  const userId = req.user._id;
  const friendRecords = await friend
    .find({ friendId: userId, confirm: false })
    .populate("userId", "_id full_name avatar")
    .exec();
  res.json({ success: true, data: friendRecords });
});

router.patch(
  "/confirmFriend",
  catchAsync(async (req, res) => {
    const userId = req.user._id;
    const { friendId, confirm } = req.body;
    if (!friendId) {
      throw new FormatError(500, "FriendId is empty");
    }
    const friendRecords = await friend
      .findOneAndUpdate(
        { userId: friendId, friendId: userId },
        { confirm },
        { new: true }
      )
      .populate("friendId", "_id full_name avatar")
      .exec();
    if (friendRecords && confirm) {
      await friend.create({ userId, friendId, confirm });

      await conversation.create({
        members: [friendId, userId],
        type: "private",
      });
    }
    if (friendRecords && !confirm) {
      await friend.deleteOne({ userId: friendId, friendId: userId });
    }

    res.json({ success: true, data: { confirm, friend: friendRecords } });
  })
);

router.post("/", async (req, res) => {
  const { friendId } = req.body;
  const userId = req.user._id;
  try {
    if (!userId && !friendId) {
      res.status(404).json({ message: "Error" });
    }

    const curFriend = await user.findById(friendId);
    if (!curFriend) {
      throw new FormatError(400, "Friend not found");
    }

    const checkFriendRecord = await friend.findOne({ userId, friendId });
    if (checkFriendRecord) {
      throw new FormatError(500, "Friend is exits");
    }
    await friend.create({ friendId, userId, confirm: false });
    const receiver = getReceiver(friendId);

    const friendRecord = await friend
      .findOne({ friendId, userId })
      .populate("userId", "_id full_name avatar")
      .populate("friendId", "_id full_name avatar")
      .exec();
    if (receiver) {
      sendData(friendId, "notify_add_friend", friendRecord);
    }

    res.json({ status: "success", data: friendRecord.friendId });
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

router.delete("/", async (req, res) => {
  const friendId = req.query.friendId;
  const userId = req.user._id;
  if (!friendId) {
    res.status(400).json({ message: "friend not found" });
  }
  try {
    const record = await friend
      .findOneAndDelete({ friendId, userId })
      .populate("friendId", "_id full_name avatar");
    res.json({
      success: true,
      data: record.friendId,
      message: "delete friend success",
    });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
