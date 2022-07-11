const connection = require("../config/connection");
const { Thought, User } = require("../models");
const { users, thoughts, reactions } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected to db");
  // clears out old collections in the socialDB so we can start fresh
  await User.deleteMany({});
  await Thought.deleteMany({});

  // Typically I'd like to use "insertMany" but I found it created issues with getters, and would throw an error
  for (const user of users) {
    await User.create(user);
  }
  // fetch the newly seeded users' data; we need this for their _id values
  let userData = await User.find();

  // adds a random friend to each user
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

  // creates an array of thoughts with randomized users
  const finalThoughts = thoughts.map((thought) => {
    const randIndex = Math.floor(Math.random() * userData.length);

    return {
      thoughtText: thought,
      userId: userData[randIndex]._id,
      username: userData[randIndex].username,
      reactions: [],
    };
  });

  // creates each thought using the array we just mapped
  // Typically I'd like to use "insertMany" but I found it created issues with getters, and would throw an error
  for (const thought of finalThoughts) {
    await Thought.create(thought);
  }
// fetches the thoughts we just created; we need their _ids to seed other data
  const thoughtData = await Thought.find();

  // adds each thought's _id to their user's thoughts array
  for (const thought of thoughtData) {
    await User.findOneAndUpdate(
      { _id: thought.userId },
      {
        $addToSet: {
          thoughts: thought._id,
        },
      }
    );
    // seeds each thought's reaction array with 3 random reactions
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
