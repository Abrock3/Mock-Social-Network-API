const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema({
  // thoughtId: {
  //   type: Schema.Types.ObjectId,
  //   default: () => new Types.ObjectId(),
  // },
  thoughtText: { type: String, required: true },
  username: { type: String, require: true },
  createdAt: {
    type: Date,
    default: Date.now,
    require: true,
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
