const jwt = require("jsonwebtoken");
const BlackListModel = require("../models/blacklist.model");


/**
 * @name authUser - middleware for user authentication - verify token - decode - find user - set user in req - next() 
 * @description Authenticate user by verifying token
 * @route GET /api/auth/get-me
 * @access Private
 */
async function authUser(req, res, next){
    try {
        const token = req.cookies.token;
        if(!token) return res.status(400).json({message: "No token found"});

        const checkBlackList = await BlackListModel.findOne({token});
        if(checkBlackList) return res.status(400).json({message: "Token is invalid"});
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
          // / will done in getMe controller
        // const user = await userModel.findById(decoded.id);
        // if(!user) return res.status(400).json({message: "User not found"});

        // req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    };
}

module.exports = authUser