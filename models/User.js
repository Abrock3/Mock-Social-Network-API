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
      validate: [
        (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
        "Please fill in a valid email address",
      ],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill in a valid email address",
      ],
    },
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
    createdAt: { type: Date, get: dateFormatter },
    updatedAt: { type: Date, get: dateFormatter },
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

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});
userSchema.virtual("thoughtCount").get(function () {
  return this.thoughts.length;
});
function dateFormatter(timestamp) {
  return timestamp.toLocaleString();
}
const User = model("user", userSchema);

module.exports = User;
