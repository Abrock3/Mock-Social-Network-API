const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
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
});

const Reaction = reactionSchema;

module.exports = Reaction;
