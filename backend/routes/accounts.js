const Express = require("express");
const { authmiddleware } = require("../middlewares/middleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");
const app = Express();
const accountsRouter = Express.Router();

accountsRouter.get("/", (req, res) => {
  console.log("Route is woring");
  res.status(200).json({
    msg: "MSG",
  });
});
accountsRouter.get("/balance", authmiddleware, async (req, res) => {
  const collection = await Account.findOne({
    userId: req.user_id,
  });
  res.status(200).json({
    "Your aukaat is": collection.balance,
  });
});
accountsRouter.post("/transfer", authmiddleware, async (req, res) => {
  console.log("Session is not working")
  // const session = await mongoose.startSession();
  // session.startTransaction();
  const { to, amount } = req.body;

  const account = await Account.findOne({ userId: req.user_id })
  if (!account || account.balance < amount) {
    
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to })

  if (!toAccount) {
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  await Account.updateOne(
    { userId: req.user_id },
    { $inc: { balance: -amount } }
  )
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  )
  // await session.commitTransaction();
  res.status(200).json({
    msg: "Transfer Successful",
  });
});
module.exports = {
  accountsRouter,
};
