const app = require('express');
const router = app.Router()
const {userRouter} = require('./user')
const {accountsRouter}  = require('./accounts')
router.get('/',(req,res) =>{
   console.log("servr is working fone!"); res.send('200')
  })

router.use('/user',userRouter)
router.use('/account',accountsRouter)
module.exports = {router}
