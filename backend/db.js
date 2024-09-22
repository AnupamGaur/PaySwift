require("dotenv").config();
const mongoose  = require('mongoose')

mongoose.connect(process.env.DB_string).then((conn) => console.log('You are now connected to',conn.connection.host)).catch(() => console.log("Therere is some error"))

// console.log("DB Connected")

const UsersSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type:String,
  required: false
},
  password: {
    type:String,
    required:true
  },
  username: {
    type:String,
    required:true
  }
})



const Users = mongoose.model('Users',UsersSchema)

const AccountsSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  balance: {
    type: Number,
    required: true
}
})

const Account = mongoose.model('Account',AccountsSchema)
module.exports = {
  Users,
  Account
}