const express = require("express");
const app = express();
const { JWT_Secret } = require("../config.js");
const { signinschema } = require("../zodtypes/types");
const { usernameschema, passwordschema } = require("../zodtypes/types");
const { Users } = require("../db");
const { authmiddleware } = require("../middlewares/middleware.js");
const jwt = require("jsonwebtoken");
const signinRoute = express.Router();
signinRoute.use(express.json());

signinRoute.post("/", async (req, res) => {
  const { success } = signinschema.safeParse(req.body);

  // console.log(req.body); req.user_id
  // console.log(req.user_id);  
  if (!success) {
    res.status(411).json({
      message: "Error while logging IN",
    });
    return;
  }
  try {
    const { username, password } = req.body;
    // console.log(req.user_id);
    const user = await Users.findOne({
      username: username,
      password: password,
    });
    const user_id = user._id;
    if (user) {
      const token = jwt.sign({user_id}, JWT_Secret);
      // console.log(token);
      res.json({
        token: token,
      });
      return;
    }
  } catch {
    res.status(500).json({
      message: "There is some Eroro",
    });
    return;
  }
});

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({
      msg: err,
    });
    return;
  }
});

module.exports = {
  signinRoute,
};
