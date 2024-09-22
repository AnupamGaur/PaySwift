const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const z = require("zod");
const { JWT_Secret } = require("../config.js");
const { Users, Account } = require("../db.js");
const signupRoute = express.Router();

// const secret = "hadimba"
app.use(express.json());
const {
  usernameschema,
  passwordschema,
  lastnameschema,
  firstnameschema,
} = require("../zodtypes/types.js");

let username, password, firstname, lastname;
signupRoute.get("/", (req, res) =>
  res.status(200).json({
    msg: "This is a post Route",
  })
);
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
    console.log("i am in the existing Users checker function");

    res.status(411).json({
      msg: "users with this username already exists",
    });
    return;
  }

  try {
    const user = await Users.create({
      firstname: firstname,
      lastname: lastname,
      password: password,
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
    console.log(error);
    res.status(500).json({
      msg: "Thiere is some error",
    });
  }
  // res.send("done")
});

app.use((err, req, res, next) => {
  if (err) {
    res.send(500).json({
      msg: "We had an internal server error",
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
