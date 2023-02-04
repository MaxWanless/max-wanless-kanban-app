const router = require("express").Router();
const userController = require("../controllers/user");
const { body } = require("express-validator");
const validation = require("../middleware/validation");
const tokenHandler = require("../middleware/tokenHandler");
const User = require("../models/user");

router.post(
  "/signup",
  body("username")
    .isLength({ min: 8 })
    .withMessage("username must be at least 8 characters"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters"),
  body("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("confirmPassword must be at least 8 characters"),
  body("username").custom((value) => {
    return User.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject("username already exists");
      }
    });
  }),
  validation.validate,
  userController.reqister
);

router.post(
  "/login",
  body("username")
    .isLength({ min: 8 })
    .withMessage("username must be at least 8 characters"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters"),
  validation.validate,
  userController.login
);

router.post("/verify-token", tokenHandler.verifyToken, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;
