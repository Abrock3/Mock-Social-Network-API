const { User, Thought } = require("../models");

module.exports = {
  getFriends(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) => {
        if (user) {
          res.json(user.friends);
        } else {
          res.status(404).json({ message: "No user with that ID!" });
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  // might want to create validation middleware
  // returning the old info, not the updated info
  createFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $addToSet: {
          friends: req.body.friendId,
        },
      },
      { new: true }
    )
      .then((user) => {
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ message: "No user with that ID!" });
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $pull: {
          friends: req.body.friendId,
        },
      },
      { new: true }
    )
      .then((user) => {
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ message: "No user with that ID!" });
        }
      })
      .catch((err) => res.status(500).json(err));
  },
};
