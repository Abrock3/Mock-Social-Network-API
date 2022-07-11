const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  getReactions,
  createReaction,
  updateReaction,
  deleteReaction,
} = require("../../controllers/thoughtController.js");

// defines routes for express. The routes' functions are imported from the controllers folder
router.route("/").get(getThoughts).post(createThought);

router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

  router.route("/:thoughtId/reactions").get(getReactions).post(createReaction);
  router
    .route("/:thoughtId/reactions/:reactionId")
    .put(updateReaction)
    .delete(deleteReaction);


module.exports = router;
