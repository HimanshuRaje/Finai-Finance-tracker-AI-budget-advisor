const jwt = require("jsonwebtoken")
require("dotenv").config();

const authMiddleware = (req,res,next) => {
    const authHeader = req.header.authorization

    if(!authHeader|| !authHeader.startsWith("Bearer ")){
        return res.status(401).json({error: "Access denied. No token provided."})
    }

    const token = authHeader.split(" ")[1]

    try{
        const decode = jwt.verify(token, process.env.JWT_SECREAT)
        req.user = decode
        next()
    }catch (error){
        return res.status(401).json({error: "Invalid token."});
    }
}

module.exports = authMiddleware
