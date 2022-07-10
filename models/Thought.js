const { Schema, model } = require("mongoose");
const Reaction = require("./Reaction.js");

// todo: add reaction count

const thoughtSchema = new Schema(
  {
    username: { type: String, required: true },
    thoughtText: {
      type: String,
      required: "You must input the thought's text",
      maxlength: 280,
      minLength: 1,
    },
    reactions: [Reaction],
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
