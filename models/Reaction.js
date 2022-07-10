const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reactionBody: { type: String, required: true },
    username: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
);

const Reaction = reactionSchema;

module.exports = Reaction;
