const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
      minLength: 1,
    },
    username: { type: String, required: true },
    createdAt: { type: Date, get: (timestamp) => timestamp.toLocaleString() },
    updatedAt: { type: Date, get: (timestamp) => timestamp.toLocaleString() },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    timestamps: true,
  }
);

const Reaction = reactionSchema;

module.exports = Reaction;
