const express = require("express");
const { authMiddleware } = require("../middleware");
const { User, Transaction } = require("../models");
const router = express.Router();

router.get("/income",authMiddleware, async (req,res)=>{
    try {
        
    const user = await User.findById(req.user).select("monthlyIncome savingsGoal currentBalance")
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User not found",
        })
    }
    res.json({
        success: true,
        income: user.monthlyIncome,
        savings: user.savingsGoal,
        balance: user.currentBalance,
    })
    } catch(error){
        console.error(error);
        res.status(500).json({
            success: false,
            message: "server error while fetching income",
        })
    }
})


/**
 * @route POST /api/v1/transaction
 * @desc Create or update monthly transaction summary
 */
router.post("/transaction", authMiddleware, async (req, res) => {
  try {
    const { month, expenses } = req.body;

    let transaction = await Transaction.findOne({ user: req.user, month });

    if (transaction) {
      // Update existing transaction summary
      transaction.expenses = expenses;
      await transaction.save();
      return res.json({ message: "Transaction updated", transaction });
    }

    // Create new transaction summary
    transaction = new Transaction({
      user: req.user,
      month,
      expenses
    });
    await transaction.save();

    res.json({ message: "Transaction created", transaction });
  } catch (error) {
    console.error("Error saving transaction:", error);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * @route GET /api/v1/transaction/:month
 * @desc Get transaction summary for a specific month
 */
router.get("/:month", authMiddleware, async (req, res) => {
  try {
    const { month } = req.params;
    const transaction = await Transaction.findOne({ user: req.user, month });

    if (!transaction) {
      return res.status(404).json({ error: "No transaction found for this month" });
    }

    res.json(transaction);
  } catch (error) {
    console.error("Error fetching transaction:", error);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * @route GET /api/v1/transaction
 * @desc Get all monthly transaction summaries for user
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user }).sort({ month: -1 });
    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router