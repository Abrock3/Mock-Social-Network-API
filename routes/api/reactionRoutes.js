const router = require("express").Router();

const {
  getReactions,
  createReaction,
  updateReaction,
  deleteReaction,
} = require("../../controllers/reactionController.js");

router.route("/:thoughtId").get(getReactions).post(createReaction);
router
  .route("/:thoughtId/:reactionId")
  .put(updateReaction)
  .delete(deleteReaction);


module.exports = router;
