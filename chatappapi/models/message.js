const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    message: {
      type: String,
    },
    images: [{ type: String }],
    creator: { type: Schema.Types.ObjectId, ref: "user" },
    conversationId: { type: Schema.Types.ObjectId, ref: "conversation" },
    status: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model("message", MessageSchema);
