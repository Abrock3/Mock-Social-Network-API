const { Schema, Types } = require("mongoose");
const ObjectId = require("mongodb").ObjectId;

const reactionSchema = new Schema(
  {
    reactionId: {
      type: ObjectId,
      default: new ObjectId(),
    },
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
  },
  { _id: false }
);

const Reaction = reactionSchema;

module.exports = Reaction;
