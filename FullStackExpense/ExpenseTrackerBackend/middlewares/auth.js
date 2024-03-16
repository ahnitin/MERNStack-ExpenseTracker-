const jwt = require("jsonwebtoken");
const User = require("../models/user");
exports.authenticate = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    let user = jwt.verify(token, process.env.SECRET_KEY);
    if (!user) {
      throw new Error("User Not Found");
    }
    let u = await User.findById(user.id);
    console.log(u);
    req.user = u;
    next();
  } catch (error) {
    console.log(error);
  }
};
