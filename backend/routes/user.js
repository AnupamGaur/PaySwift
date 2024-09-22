const express = require('express')
const userRouter = express.Router()
const {Users} = require('../db.js')
const {authmiddleware} = require('../middlewares/middleware.js')
const Zod = require("zod");
const { password } = require('./singnupRoute.js');

const updateBody = Zod.object({
  password: Zod.string().optional(),
     firstName: Zod.string().optional(),
     lastName: Zod.string().optional(),
  })

userRouter.get('/bulk',async (req,res) => {
  const filter = req.query.filter || ""
  console.log(filter);  
  
  const users = await Users.find({
    $or: [{
      firstname:{
        "$regex":filter
      }
    },{
      lastname: {
        "$regex": filter
    
    }
  }]
})

res.json({
  user: users.map(user => ({
      username: user.username,
      firstName: user.firstname,
      lastName: user.lastname,
      _id: user._id
  }))
})
})
userRouter.put('/',authmiddleware,async (req,res) => {
  const {success} = updateBody.safeParse(req.body)
  if(!success){

    res.send(411).json({
      "msg":"Error while updating Info"
    })
  }

console.log(req.user_id.user_id)
  await Users.updateOne({
    _id: req.user_id
  },req.body)

  res.status(200).json({
    "msg":"Updated Successfully"
  })
  return;
})

module.exports = {userRouter}

