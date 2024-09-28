const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const z = require("zod");
const { JWT_Secret } = require("../config.js");
const { Users, Account } = require("../db.js");
const signupRoute = express.Router();
const bcrypt = require("bcrypt");

app.use(express.json());
const {
  usernameschema,
  passwordschema,
  lastnameschema,
  firstnameschema,
} = require("../zodtypes/types.js");

let username, password, firstname, lastname;
signupRoute.post("/", async (req, res) => {
  const { username, password, firstname, lastname } = req.body;

  if (!username || !password || !firstname || !lastname) {
    res.status(400).json({
      msg: "Enter all details",
    });
    return;
  }
  if (
    !usernameschema.safeParse(username).success ||
    !passwordschema.safeParse(password).success ||
    !firstnameschema.safeParse(firstname).success ||
    !lastnameschema.safeParse(lastname).success
  ) {
    res.status(400).json({
      msg: "YOur inputs are not correct!",
    });
    return;
  }

  let existingUser = await Users.exists({
    username: username,
  });
  console.log(existingUser);
  if (existingUser) {
    res.status(411).json({
      msg: "users with this username already exists",
    });
    return;
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await Users.create({
      firstname: firstname,
      lastname: lastname,
      password: hashedPassword,
      username: username,
    });
    const user_id = user._id;
    const Balance = await Account.create({
      userId: user_id,
      balance: 1000 * Math.random(),
    });

    const token = jwt.sign({ user_id }, JWT_Secret);
    res.status(201).json({
      user_id: user_id,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      msg: "There is some error",
    });
  }
});

app.use((err, req, res, next) => {
  if (err) {
    res.send(500).json({
      msg: "Internal server error",
    });
  }
});
module.exports = {
  signupRoute,
  username,
  password,
  firstname,
  lastname,
};
