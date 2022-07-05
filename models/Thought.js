const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema({
  thoughtText: { type: String, required: true },
  username: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  reactions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Reaction",
    },
  ],
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
