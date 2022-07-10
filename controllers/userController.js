const { User, Thought } = require("../models");

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => {
        if (users && users.length !== 0) {
          res.json(users);
        } else {
          res.status(404).json({ message: "No users found!" });
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) => {
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ message: "No user with that ID found!" });
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        return res.status(500).json(err);
      });
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $set: { email: req.body.email, username: req.body.username },
      },
      { new: true, runValidators: true }
    )
      .then((user) => {
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ message: "No user with that ID found!" });
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
        if (user) {
          res.json({
            message: `User with id ${req.params.userId} deleted!`,
          });
          Thought.deleteMany({ userId: req.params.userId }).catch((err) =>
            console.log(err)
          );
        } else {
          res.status(404).json({ message: "No user with that ID found!" });
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  getFriends(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) => {
        if (user) {
          if (user.friends.length !== 0) {
            res.json(user.friends);
          } else {
            res.status(404).json({ message: "This user has no friends!" });
          }
        } else {
          res.status(404).json({ message: "No user with that ID found!" });
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  createFriend(req, res) {
    User.findOne({ _id: req.params.friendId }).then((friend) => {
      if (friend && friend.length !== 0) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          {
            $addToSet: {
              friends: req.params.friendId,
            },
          },
          { new: true, runValidators: true }
        )
          .then((user) => {
            if (user) {
              res.json(user);
            } else {
              res
                .status(404)
                .json({ message: "No user with that userId found!" });
            }
          })
          .catch((err) => res.status(500).json(err));
      } else {
        res.status(404).json({ message: "No user with that friendId found!" });
      }
    });
  },
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $pull: {
          friends: req.params.friendId,
        },
      },
      { new: true, runValidators: true }
    )
      .then((user) => {
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ message: "No user with that userId found!" });
        }
      })
      .catch((err) => res.status(500).json(err));
  },
};
