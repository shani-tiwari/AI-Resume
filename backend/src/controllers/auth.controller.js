const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



/**
 * @name registerUser - controller for user registration
 * @description Register a new User
 * @route POST /api/auth/register
 * @access Public
 */
async function registerUser(req, res){
    
    try {
        const {name, email, password} = req.body;
        
        if(!name || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        const ifExist = await userModel.findOne( {$or: [{email}, {username}]} );
        if(ifExist) return res.status(400).json({message: "User already exists with this email"});

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({name, email, password: hashPassword});

        const token = jwt.sign({id: newUser._id, username: newUser.username}, process.env.JWT_SECRET, {expiresIn: "1d"});   

        res.cookie("token", token);

        return res.status(201).json({
            message: "User registered successfully", 
            newUser:{
                _id: newUser._id,
                name: newUser.name,
                username: newUser.username
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    };

};


/**
 * @name loginUser - controller for user login
 * @description Login a User, expects email and password
 * @route POST /api/auth/login
 * @access Public
 */
async function loginUser(req, res){
    try {
        const {email, password} = req.body;
        
        if(!email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        const user = await userModel.findOne({email});
        if(!user) return res.status(400).json({message: "User not found"});

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) return res.status(400).json({message: "Invalid password"});

        const token = jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET, {expiresIn: "1d"});

        res.cookie("token", token);

        return res.status(200).json({message: "User logged in successfully", user:{
            _id: user._id,
            email: user.email,
            username: user.username,
        }});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    };
};

module.exports = {registerUser, loginUser};