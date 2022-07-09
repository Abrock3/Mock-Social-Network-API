const { Schema, model } = require("mongoose");

// ToDo: Add Friend Count

const userSchema = new Schema(
  {
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
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model("user", userSchema);

module.exports = User;
