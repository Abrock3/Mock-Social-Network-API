const { User, Thought } = require("../models");

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => {
        if (users) {
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
          res.status(404).json({ message: "No user with that ID!" });
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $set: { email: req.body.email, username: req.body.username },
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
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
        if (user) {
          res.json({
            message: `User with id ${req.params.thoughtId} deleted!`,
          });
        } else {
          res.status(404).json({ message: "There's no user with that ID!" });
        }
      })
      .catch((err) => res.status(500).json(err));
  },
};
