const express = require("express");
const authRouter = require("./auth")
const goalRouter = require("./goals")
const advisorRouter = require("./advisor")
const transactionRouter = require("./transactions");
const router = express.Router();

router.use("/auth", authRouter);
router.use("/goals", goalRouter);
router.use("/advisor", advisorRouter);
router.use("/account", transactionRouter);

module.exports = router;
//here we exported router
