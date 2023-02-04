const User = require("../models/user");
const CryptoJS = require("crypto-js");
const jsonWebToken = require("jsonwebtoken");

exports.reqister = async (req, res) => {
  const { password } = req.body;

  try {
    req.body.password = CryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_SECRET
    ).toString();

    const user = await User.create(req.body);

    const token = jsonWebToken.sign(
      { id: user._id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).select("password username");
    if (!user) {
      return res.status(401).json({
        errors: [
          {
            param: "username",
            msg: "Invalid username",
          },
        ],
      });
    }

    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    ).toString(CryptoJS.enc.Utf8);

    if (decryptedPassword !== password) {
      return res.status(401).json({
        errors: [
          {
            param: "username",
            msg: "Invalid password",
          },
        ],
      });
    }

    user.password = undefined;

    const token = jsonWebToken.sign(
      { id: user._id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json(err);
  }
};
