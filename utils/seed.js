const connection = require("../config/connection");
const { Thought, User } = require("../models");
const { users, thoughts, reactions } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  await User.deleteMany({});
  await Thought.deleteMany({});
  await User.collection.insertMany(users);

  let userData = await User.find();
  userData.forEach(async (user) => {
    await User.findOneAndUpdate(
      { _id: user._id },
      {
        $addToSet: {
          friends: userData[Math.floor(Math.random() * userData.length)]._id,
        },
      }
    );
  });

  const finalThoughts = thoughts.map((thought) => {
    const randIndex = Math.floor(Math.random() * userData.length);

    return {
      thoughtText: thought,
      userId: userData[randIndex]._id,
      username: userData[randIndex].username,
      reactions: [],
    };
  });

  await Thought.collection.insertMany(finalThoughts);

  const thoughtData = await Thought.find();
  console.log(thoughtData);
  thoughtData.forEach(async (thought) => {
    await User.findOneAndUpdate(
      { _id: thought.userId },
      {
        $addToSet: {
          thoughts: thought._id,
        },
      }
    );
    let reactionArray = [];
    for (let i = 0; i < 3; i++) {
      const randUser = Math.floor(Math.random() * userData.length);
      const randReaction =
        reactions[Math.floor(Math.random() * reactions.length)];
      reactionArray.push({
        username: userData[randUser].username,
        userId: userData[randUser]._id,
        reactionBody: randReaction,
      });
    }
    await Thought.findOneAndUpdate(
      { _id: thought._id },
      {
        $push: {
          reactions: reactionArray,
        },
      }
    );
  });

  console.log("Seeded users:");
  console.log(await User.find());
  console.log("Seeded thoughts:");
  console.log(await Thought.find());
  console.log("Database seeded!");
  process.exit(0);
});
