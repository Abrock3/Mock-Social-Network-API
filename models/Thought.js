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
    // creates an array of subdocuments, defined by the Reaction schema
    reactions: [Reaction],
    // these fields are created by the mongoose "timestamps: true" option (below)
    // we can use getters to modify their values when requested
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
// when thoughts are requested, this virtual will return the number of reactions on each thought
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
