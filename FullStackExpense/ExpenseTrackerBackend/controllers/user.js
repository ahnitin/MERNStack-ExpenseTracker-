const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.postSignUp = async (req, res) => {
  try {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let saltrounds = 10;
    let hash = await bcrypt.hash(password, saltrounds);
    let user = new User({
      name: name,
      email: email,
      password: hash,
      isPremium: false,
      totalExpense: 0,
      order: {},
    });
    let result = await user.save();
    console.log(result);
    res.status(201).json({
      message: "User Created Successfully",
      user: result,
    });
  } catch (error) {
    res.status(500).json({
      error: "Something Went Wrong!",
    });
  }
};
exports.generateToken = (id, name, isPremium) => {
  let obj = { id, name, isPremium };
  return jwt.sign(obj, process.env.SECRET_KEY);
};
exports.postLogin = async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(403).json({
        error: "Invalid User!",
      });
    }
    console.log(user.password);
    let result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.status(401).json({
        error: "Incorrect Password!",
      });
    }
    res.status(202).json({
      token: exports.generateToken(user._id, user.name, user.isPremium),
      message: "Successfully LoggedIn",
    });
  } catch (error) {
    console.log(error);
  }
};
