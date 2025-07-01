const express = require("express");
const goalRouter = require("./goals")
const advisorRouter = require("./advisor")
const transactionRouter = require("./transactions");
const router = express.Router();

router.use("/goals", goalRouter);
router.use("/advisor", advisorRouter);
router.use("/account", transactionRouter);

module.exports = router;
//here we exported router
