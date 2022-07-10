const { Schema, model } = require("mongoose");
const Reaction = require("./Reaction.js");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "You must send thoughtText in the body of the request",
      maxlength: 280,
      minLength: 1,
    },
    username: { type: String, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: "You must send a valid userId in the body of the request",
    },
    reactions: [Reaction],
    createdAt: { type: Date, get: (timestamp) => timestamp.toLocaleString() },
    updatedAt: { type: Date, get: (timestamp) => timestamp.toLocaleString() },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    timestamps: true,
    id: false,
  }
);
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
