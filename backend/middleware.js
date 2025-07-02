const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("./config")

const authMiddleware = (req,res,next) => {
    const authHeader = req.headers.authorization

    if(!authHeader|| !authHeader.startsWith("Bearer ")){
        return res.status(401).json({error: "Access denied. No token provided."})
    }

    const token = authHeader.split(' ')[1]

    try{
        const decode = jwt.verify(token, JWT_SECRET)
        req.user = decode
        next()
    }catch (error){
        return res.status(401).json({error: "Invalid token."});
    }
}

module.exports = {
    authMiddleware
};
