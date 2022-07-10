const { User, Thought } = require("../models");

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => {
        if (thoughts) {
          res.json(thoughts);
        } else {
          res.status(404).json({ message: "No thoughts found!" });
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) => {
        if (thought) {
          res.json(thought);
        } else {
          res.status(404).json({ message: "No thoughts found!" });
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  createThought(req, res) {
    User.findOne({ _id: req.body.userId })
      .then((user) => {
        if (user) {
          // todo: need to push thought id to user's thoughts array
          req.body.username = user.username;
          Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => {
              console.log(err);
              return res.status(500).json(err);
            });
        } else {
          res.status(404).json({ message: "No user with that ID found!" });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {
        $set: { thoughtText: req.body.thoughtText },
      },
      { new: true }
    )
      .then((thought) => {
        if (thought) {
          res.json(thought);
        } else {
          res.status(404).json({ message: "No thought with that ID!" });
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {
        if (thought) {
          // need to remove thought from user's list as well
          res.json({
            message: `Thought with id ${req.params.thoughtId} deleted!`,
          });
        } else {
          res.status(404).json({ message: "There's no thought with that ID!" });
        }
      })
      .catch((err) => res.status(500).json(err));
  },
};
