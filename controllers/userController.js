const { User, Thought } = require("../models");

// this gets exported to the userRoutes.js file for use in the app's routes
module.exports = {
  // gets all users
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
  // gets one user by their _id
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
  // creates a new user, requires a JSON body with a username and valid email
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        return res.status(500).json(err);
      });
  },
  // updates a user; requires a JSON body with either a username or a valid email, or both
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
  // finds and deletes a user's entry; then it will delete each of their thoughts in the thoughts collection. 
  // Their reactions will remain
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
  // gets a user's friends by the user's _id
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
  // adds a friendId to a user's friends array
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
  // removes a friendID from a user's friends array
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
