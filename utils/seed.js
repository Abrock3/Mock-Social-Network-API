const connection = require("../config/connection");
const { Reaction, Thought, User } = require("../models");
const { users, thoughts, reactions } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  await User.deleteMany({});
  await Thought.deleteMany({});
  await Reaction.deleteMany({});

  process.exit(0);
});
