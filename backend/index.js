const express = require("express");
const app = express();
const {router} = require("./routes"); 
const cors = require('cors')
const {signupRoute} = require('./routes/singnupRoute')
const {signinRoute} = require('./routes/signin')
app.use(cors())
app.use(express.json())
app.use('/api/v1',router)

app.use('/signup',signupRoute)
app.use('/signin',signinRoute)
app.listen(3000)

