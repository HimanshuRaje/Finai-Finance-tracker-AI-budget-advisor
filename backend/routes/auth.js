const express = require("express");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = require("../config");
const router = express.Router();

const registerBody = zod.object({
    username : zod.string(),
    password: zod.string(),
    email : zod.string().email(),
})

router.post("/register" , async (req, res)=>{
    const { success } = registerBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({ message: "Invalid inputs" });
    }

    const existingEmail = await User.findOne({ email: req.body.email });
    if (existingEmail) {
        return res.status(409).json({ message: "Email already exists" });
    }
    const existingUser = await User.findOne({
        username: req.body.username
    })
    if (existingUser){
        return res.status(402).json({ message: "username already taken" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password,10);

    const user = await User.create({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
    })
    const userId = user._id;

    const token = jwt.sign({ userId }, JWT_SECRET)

    res.json({
        message: "User created successfully",
        token: token
    })

})

module.exports = router