const { User, Thought } = require("../models");

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => {
        if (thoughts && thoughts.length !== 0) {
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
          res.status(404).json({ message: "No thought with this ID found!" });
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  createThought(req, res) {
    User.findOne({ _id: req.body.userId })
      .then((user) => {
        if (user) {
          req.body.username = user.username;
          Thought.create(req.body)
            .then((thought) => {
              res.json(thought);
              User.findOneAndUpdate(
                { _id: req.body.userId },
                {
                  $addToSet: {
                    thoughts: thought._id,
                  },
                },
                { new: true, runValidators: true }
              ).catch((err) => console.log(err));
            })
            .catch((err) => {
              return res.status(500).json(err);
            });
        } else {
          res.status(404).json({ message: "No user with that ID found!" });
        }
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {
        $set: { thoughtText: req.body.thoughtText },
      },
      { new: true, runValidators: true }
    )
      .then((thought) => {
        if (thought) {
          res.json(thought);
        } else {
          res.status(404).json({ message: "No thought with this ID found!" });
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {
        if (thought) {
          res.json({
            message: `Thought with id ${req.params.thoughtId} deleted!`,
          });
          User.findOneAndUpdate(
            { _id: thought.userId },
            {
              $pull: {
                thoughts: thought._id,
              },
            },
            { new: true, runValidators: true }
          ).catch((err) => console.log(err));
        } else {
          res.status(404).json({ message: "No thought with this ID found!" });
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  getReactions(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) => {
        if (thought) {
          if (thought.reactions && thought.reactions.length !== 0) {
            res.json(thought.reactions);
          } else {
            res
              .status(404)
              .json({ message: "This thought has no associated reactions!" });
          }
        } else {
          res.status(404).json({ message: "No thought with this ID found!" });
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  createReaction(req, res) {
    User.findOne({ _id: req.body.userId })
      .then((user) => {
        if (user) {
          req.body.username = user.username;
          Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            {
              $addToSet: {
                reactions: req.body,
              },
            },
            { new: true, runValidators: true }
          )
            .then((thought) => {
              if (thought) {
                res.json(thought);
              } else {
                res
                  .status(404)
                  .json({ message: "No thought with this ID found!" });
              }
            })
            .catch((err) => {
              return res.status(500).json(err);
            });
        } else {
          res.status(404).json({ message: "No user with that ID found!" });
        }
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  },
  updateReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {
        $set: {
          "reactions.$[element].reactionBody": req.body.reactionBody,
        },
      },
      {
        arrayFilters: [{ "element._id": req.params.reactionId }],
        new: true,
        runValidators: true,
      }
    )
      .then((thought) => {
        if (thought) {
          res.json(thought);
        } else {
          res.status(404).json({ message: "No thought with this ID found!" });
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {
        $pull: {
          reactions: { _id: req.params.reactionId },
        },
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .then((thought) => {
        if (thought) {
          res.json(thought);
        } else {
          res.status(404).json({ message: "No thought with this ID found!" });
        }
      })
      .catch((err) => res.status(500).json(err));
  },
};
