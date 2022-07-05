const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  // userId: {
  //   type: Schema.Types.ObjectId,
  //   default: () => new Types.ObjectId(),
  // },
  email: { type: String, required: true },
  username: { type: String, required: true },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thought",
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const User = model("user", userSchema);

module.exports = User;
