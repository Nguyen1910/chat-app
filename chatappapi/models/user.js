const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    full_name: {
      type: String,
    },
    gender: {
      type: String,
    },
    password: { type: String },
    salt: { type: String },
    email: { type: String, unique: true },
    avatar: { type: String },
    birthday: { type: Date },
    providerId: { type: String },
    conversations: [{ type: Schema.Types.ObjectId, ref: "conversation" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
