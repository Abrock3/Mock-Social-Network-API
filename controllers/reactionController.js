const { User, Thought } = require("../models");

module.exports = {
  getReactions(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) => {
        if (thought) {
          res.json(thought.reactions);
        } else {
          res.status(404).json({ message: "No thought with that ID!" });
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
            { new: true }
          )
            .then((thought) => {
              if (thought) {
                res.json(thought);
              } else {
                res
                  .status(404)
                  .json({ message: "No thought with that ID found!" });
              }
            })
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
      }
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
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {
        $pull: {
          reactions: { _id: req.params.reactionId},
        },
      },
      {
        new: true,
      }
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
};
