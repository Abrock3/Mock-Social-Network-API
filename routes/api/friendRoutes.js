const router = require("express").Router();
const {
  getFriends,
  createFriend,
  deleteFriend,
} = require("../../controllers/friendController.js");

router
  .route("/:userId")
  .get(getFriends)
  .post(createFriend)
  .delete(deleteFriend);

module.exports = router;
