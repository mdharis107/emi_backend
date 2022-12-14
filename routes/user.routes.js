const { Router } = require("express");
const { UserModel } = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  const isUser = await UserModel.findOne({ email });

  if (isUser) {
    res.send({ msg: "User already exist try logging in" });
  } else {
    bcrypt.hash(password, 4, async function (err, hash) {
      if (err) {
        res.send({ msg: "Something went wrong sign Later" });
      }
      try {
        const new_user = new UserModel({
          username,
          email,
          password: hash,
        });
        await new_user.save();
        res.send({ msg: "Signup Successful" });
      } catch (err) {
        res.send({ msg: "Sign up not Successful" });
        console.log(err);
      }
    });
  }
});

//login port
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  const hashed_pass = user.password;

  const user_email = email;

  bcrypt.compare(password, hashed_pass, function (err, result) {
    if (err) {
      res.send({ msg: "Something went wrong try again later" });
    }
    if (result) {
      const token = jwt.sign({ user_email }, process.env.PRIVATE_KEY);
      res.send({ token: token, msg: "Login Successful" });
    } else {
      res.send({ msg: "Login failed" });
    }
  });
});

//userProfile

userRouter.get("/profile", async (req, res) => {
  // const { user_email } = req.body;
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      res.send({ msg: "Please login" });
    } else {
      res.send({
        msg: "User Profile found",
        data: user,
      });
    }
  } catch (err) {
    res.send({ msg: err });
  }
});


module.exports = {
  userRouter,
};
