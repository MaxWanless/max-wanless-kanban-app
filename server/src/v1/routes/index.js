const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/boards", require("./board"));
router.use("/boards/:boardId/sections", require("./sections"));
router.use("/boards/:boardId/tasks", require("./tasks"));

module.exports = router;
