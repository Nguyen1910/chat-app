const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    friendId: { type: Schema.Types.ObjectId, ref: "user" },
    confirm: { type: Boolean },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("friend", FriendSchema);
