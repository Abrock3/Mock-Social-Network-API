const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema(
  {
    // I wished to create a reactionId using the mongoose.Types.ObjectId() method,
    // but when using that, multiple create requests within a short time of one another will produce
    // identical ObjectIds for the inserted documents. No such issue exists when using the standard _id,
    // so I stuck with that
    reactionBody: {
      type: String,
      // this is equivalent to required: true, but will also return a custom error message
      required: "You must include a reactionBody in the body of the request",
      maxLength: 280,
      minLength: 1,
    },
    username: { type: String, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: "You must include a valid userId in the body of the request",
    }, 
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

const Reaction = reactionSchema;

module.exports = Reaction;
