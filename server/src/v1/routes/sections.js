const router = require("express").Router({ mergeParams: true });
const { param } = require("express-validator");
const validation = require("../middleware/validation");
const tokenHandler = require("../middleware/tokenHandler");
const sectionsController = require("../controllers/sections");

router.post(
  "/",
  param("boardId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("invalid id");
    } else return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  sectionsController.create
);

router.put(
  "/:sectionId",
  param("boardId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("invalid board id");
    } else return Promise.resolve();
  }),
  param("sectionId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("invalid section id");
    } else return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  sectionsController.update
);

router.delete(
  "/:sectionId",
  param("boardId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("invalid board id");
    } else return Promise.resolve();
  }),
  param("sectionId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("invalid section id");
    } else return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  sectionsController.delete
);

module.exports = router;
