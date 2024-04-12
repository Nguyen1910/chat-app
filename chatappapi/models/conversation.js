const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema(
  {
    name: {
      type: String,
    },
    avatar: { type: String },
    members: [{ type: Schema.Types.ObjectId, ref: "user" }],
    latest_message: { type: Schema.Types.ObjectId, ref: "message" },
    type: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("conversation", ConversationSchema);
