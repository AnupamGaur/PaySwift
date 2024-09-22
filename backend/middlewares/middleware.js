const jwt = require('jsonwebtoken')
const {JWT_Secret} = require('../config')
function authmiddleware(req,res,next) {
  try {
  var token_with_bearer = req.headers.authorization;
  var token = token_with_bearer.split(' ')[1]
  // console.log(token)
  const {user_id} = jwt.verify(token,JWT_Secret)
  // console.log(user_id)
  req.user_id = user_id
  next();
  }
  catch {
    res.status(403).json({
      "msg":"Forbidden!"
    })
  }
}
module.exports = {
  authmiddleware
}