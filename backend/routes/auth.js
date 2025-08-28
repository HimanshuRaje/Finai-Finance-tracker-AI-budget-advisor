const express = require("express");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = require("../config");
const router = express.Router();
const { authMiddleware } = require("../middleware");


//signup route
const registerBody = zod.object({
    email : zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string(),
})

router.post("/register" , async (req, res)=>{
    const { success } = registerBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({ message: "Invalid inputs" });
    }

    const existingUser = await User.findOne({
        email: req.body.email
    })
    if (existingUser){
        return res.status(402).json({ message: "email already taken" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password,10);

    const user = await User.create({
        email: req.body.email,
        password: hashedPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })
    const userId = user._id;

    const token = jwt.sign({ userId }, JWT_SECRET)

    res.json({
        message: "User created successfully",
        token: token
    })

})

//login/signin route 

const loginBody = zod.object({
    email : zod.string().email(),
    password: zod.string(),
})

router.post("/login" , async (req, res)=>{
    const { success } = loginBody.safeParse(req.body);
    if (!success){
        return res.status(400).json({ message: "Invalid inputs" });
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(401).json({ message: "This email is not Registered" });
        }
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  const token = jwt.sign({ userId: user._id },JWT_SECRET);

  res.json({
    message: "Login successful",
    token: token,
  });

})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    monthlyIncome: zod.number().optional(),
});

router.put("/update", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        });
    }

    await User.updateOne({_id: req.user},{$set: req.body});

    res.json({
        message: "Updated successfully"
    });
});

router.get("/username", authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({_id: req.user});
        

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            firstName: user.firstName,
            lastName: user.lastName,
            monthlyIncome: user.monthlyIncome,
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/income", authMiddleware, async (req, res) => {
  try {
    const { monthlyIncome } = req.body;

    if (!monthlyIncome) {
      return res.status(400).json({ message: "Monthly income is required" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { monthlyIncome },
      { new: true }
    );

    res.json({ message: "Income updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log(error)
  }
});

module.exports = router