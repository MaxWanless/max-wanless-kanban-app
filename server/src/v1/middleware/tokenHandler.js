const jsonWebToken = require("jsonwebtoken");
const User = require("../models/user");

const tokenDecode = (req) => {
  const tokenHeader = req.header("Authorization");
  if (tokenHeader) {
    const token = tokenHeader.split(" ")[1];
    try {
      const decodedToken = jsonWebToken.verify(token, process.env.TOKEN_SECRET);
      return decodedToken;
    } catch {
      return false;
    }
  } else return false;
};

exports.verifyToken = async (req, res, next) => {
  const decodedToken = tokenDecode(req);
  const user = await User.findById(decodedToken.id);
  if (decodedToken) {
    if (!user) return res.status(401).json("Unathorized");
    req.user = user;
    next();
  } else res.status(401).json("Unathorized");
};
