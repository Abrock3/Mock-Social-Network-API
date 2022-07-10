const connection = require("../config/connection");
const { Thought, User } = require("../models");
const { users, thoughts, reactions } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected to db");
  await User.deleteMany({});
  await Thought.deleteMany({});
  // Typically I'd like to use "insertMany" but I found it created issues with getters, and would throw an error
  for (const user of users) {
    await User.create(user);
  }
  let userData = await User.find();

  for (const user of userData) {
    await User.updateOne(
      { _id: user._id },
      {
        $addToSet: {
          friends: userData[Math.floor(Math.random() * userData.length)]._id,
        },
      }
    );
  }
  const finalThoughts = thoughts.map((thought) => {
    const randIndex = Math.floor(Math.random() * userData.length);

    return {
      thoughtText: thought,
      userId: userData[randIndex]._id,
      username: userData[randIndex].username,
      reactions: [],
    };
  });
  // Typically I'd like to use "insertMany" but I found it created issues with getters, and would throw an error
  for (const thought of finalThoughts) {
    await Thought.create(thought);
  }

  const thoughtData = await Thought.find();

  for (const thought of thoughtData) {
    await User.findOneAndUpdate(
      { _id: thought.userId },
      {
        $addToSet: {
          thoughts: thought._id,
        },
      }
    );
    for (let i = 0; i < 3; i++) {
      const randUser = Math.floor(Math.random() * userData.length);
      const randReaction =
        reactions[Math.floor(Math.random() * reactions.length)];
      const reactionObject = {
        username: userData[randUser].username,
        userId: userData[randUser]._id,
        reactionBody: randReaction,
      };
      await Thought.findOneAndUpdate(
        { _id: thought._id },
        {
          $push: {
            reactions: reactionObject,
          },
        }
      );
    }
  }

  console.log("Seeded users:");
  console.log(await User.find());
  console.log("Seeded thoughts:");
  console.log(await Thought.find());
  console.log("Database seeded!");
  process.exit(0);
});
