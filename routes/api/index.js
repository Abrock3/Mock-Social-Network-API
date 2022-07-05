const router = require("express").Router();

const userRoutes = require("./userRoutes");
const friendRoutes = require("./friendRoutes");
const thoughtRoutes = require("./thoughtRoutes");
const reactionRoutes = require("./reactionRoutes");

router.use("/users", userRoutes);
router.use("/friends", friendRoutes);
router.use("/thoughts", thoughtRoutes);
router.use("/reactions", reactionRoutes);

module.exports = router;
