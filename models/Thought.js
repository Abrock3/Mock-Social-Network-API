const { Schema, model } = require("mongoose");
const Reaction = require("./Reaction.js");

// todo: add reaction count

const thoughtSchema = new Schema({
  username: { type: String, required: true },
  thoughtText: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    require: true,
  },
  reactions: [Reaction],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
