const {Router} = require("express");
const { registerUser, loginUser, logoutUser, getMe } = require("../controllers/auth.controller");
const authUser = require("../middleware/auth.middleware");
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


/**
 * @description Logout a user
 * @route POST /api/auth/logout
 * @access Public
 */
authRouter.get("/logout", logoutUser); 


/**
 * @route GET /api/auth/get-me
 * @description Get current logged in user details
 * @access Private
 */
authRouter.get("/get-me", authUser, getMe);




module.exports = authRouter;