const { Schema, model } = require("mongoose");

const reactionSchema = new Schema({
  // reactionId: {
  //   type: Schema.Types.ObjectId,
  //   default: () => new Types.ObjectId(),
  // },
  reactionBody: { type: String, required: true },
  username: { type: String, require: true },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Reaction = model("reaction", reactionSchema);

module.exports = Reaction;
