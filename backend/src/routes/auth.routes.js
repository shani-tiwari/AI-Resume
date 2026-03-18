const {Router} = require("express");
const { registerUser, loginUser } = require("../controllers/auth.controller");
const authRouter = Router();


/**
 * @description Register a new user
 * @route POST /api/auth/register
 * @access Public   
 */
authRouter.post("/register", registerUser);


/**
 * @description Login a user
 * @route POST /api/auth/login
 * @access Public
 */
authRouter.post("/login", loginUser);




module.exports = authRouter;