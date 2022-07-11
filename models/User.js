const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: "You must send a username in the body of the request",
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: "You must send a valid email in the body of the request",
      // will validate that this is a valid mail and reject it if not
      validate: [
        (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
        "Please fill in a valid email address",
      ],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill in a valid email address",
      ],
    },
    // holds an array of thoughts' _ids
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    // holds an array of users' _ids
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
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
// these virtuals will, upon a request, count a user's number of friends and thoughts 
// and return those values with the response
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});
userSchema.virtual("thoughtCount").get(function () {
  return this.thoughts.length;
});

const User = model("user", userSchema);

module.exports = User;
