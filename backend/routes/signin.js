const express = require("express");
const app = express();
const { JWT_Secret } = require("../config.js");
const { signinschema } = require("../zodtypes/types");
const { usernameschema, passwordschema } = require("../zodtypes/types");
const { Users } = require("../db");
const { authmiddleware } = require("../middlewares/middleware.js");
const jwt = require("jsonwebtoken");
const signinRoute = express.Router();
const bcrypt = require('bcrypt')
signinRoute.use(express.json());

signinRoute.post("/", async (req, res) => {
  const { success } = signinschema.safeParse(req.body);


  if (!success) {
    res.status(411).json({
      message: "Error while logging IN",
    });
    return;
  }
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({
      username: username,
    });
    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
      const user_id = user._id;
      const token = jwt.sign({user_id}, JWT_Secret);
      res.json({
        token: token,
      });
      return;

  } catch {
    res.status(500).json({
      message: "There is some Error",
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
