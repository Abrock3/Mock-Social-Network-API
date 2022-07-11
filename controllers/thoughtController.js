const { User, Thought } = require("../models");

// this gets exported to the thoughtRoutes.js file for use in the app's routes
module.exports = {
  // gets all thoughts and returns no thoughts found if the returned array is empty
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
  // gets one thought by _id and returns a custom error if that _id doesn't exist
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
  // creates a thought; requires a JSON body with the user's ID and thoughtText.
  // First we validate that the user exists with a 
  // query, then we pull their username from that query and add it to the request, and create a new thought
  // with that info. THen, finally, the user's thoughts array is updated with they new thought's _id. 
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
  // Requires a JSON body with the new desired thoughtText. Finds a thought by ID and changes its thoughtText.
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
  // finds a thought by its _id and deletes it; then deletes the thought's _id from its user's thoughts array
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
  // searches for a thought by _id and returns its reactions array
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
  // creates a new reaction on a thought. Requires a JSON body with the user's _id and the reactionBody
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
  // updates the reactionBody of a reaction. requires the associated thought's _id and the reaction's _id
  // in addition a JSON body with a reactionBody is required 
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
  // finds and deletes a reaction from the thought's reactions array
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
