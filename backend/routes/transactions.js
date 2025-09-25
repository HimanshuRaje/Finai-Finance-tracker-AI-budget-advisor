const express = require("express");
const { authMiddleware } = require("../middleware");
const { User, Transaction } = require("../models");
const router = express.Router();

router.post("/details",authMiddleware, async(req, res)=>{
    try{
        const{type,amount,category,source,note,date}= req.body;

        const transaction = await Transaction.create({
            user: req.user,
            type,amount,category,source,note,date,
        })
        res.status(201).json({message: "Transaction added",transaction})
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Faild to add transaction"})
    }
})

router.get("/details",authMiddleware, async(req,res)=>{
    try{
        const transaction = await Transaction.findById(req.user).sort({date: -1})
        const income = transaction.filter(t=> t.type ==="income")
        const expense = transaction.filter(t=> t.type ==="expense")

        //metrics
        const totalIncome = income.reduce((acc, t) => acc + t.amount, 0);
        const totalExpenses = expense.reduce((acc, t) => acc + t.amount, 0);
        const savings = totalIncome - totalExpenses;
        // Expense breakdown %
        const expenseBreakdown = {};
        expense.forEach(t => {
        expenseBreakdown[t.category] = (expenseBreakdown[t.category] || 0) + t.amount;
        });
        for (let cat in expenseBreakdown) {
        expenseBreakdown[cat] = Math.round((expenseBreakdown[cat] / totalExpenses) * 100);
        }

        res.json({
        transactions: { income, expense },
        metrics: { totalIncome, totalExpenses, savings, expenseBreakdown }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch transactions" });
    }
})

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

module.exports = router