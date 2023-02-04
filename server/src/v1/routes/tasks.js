const router = require("express").Router({ mergeParams: true });
const { param, body } = require("express-validator");
const validation = require("../middleware/validation");
const tokenHandler = require("../middleware/tokenHandler");
const taskController = require("../controllers/tasks");

router.post(
  "/",
  param("boardId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("invalid id");
    } else return Promise.resolve();
  }),
  body("sectionId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("invalid Section id");
    } else return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.create
);

router.put(
  "/update-position",
  param("boardId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("invalid id");
    } else return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.updatePosition
);

router.delete(
  "/:taskId",
  param("boardId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("invalid id");
    } else return Promise.resolve();
  }),
  param("taskId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("invalid task id");
    } else return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.delete
);

router.put(
  "/:taskId",
  param("boardId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("invalid id");
    } else return Promise.resolve();
  }),
  param("taskId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("invalid task id");
    } else return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.update
);

module.exports = router;
