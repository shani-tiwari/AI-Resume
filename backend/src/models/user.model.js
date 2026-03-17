const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [ true, "username is required"],
        unique: [ true, "username already exists"],
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: [ true, "email is required"],
        unique: [ true, "email already exists"],
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [ true, "password is required"],
    },    
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel; 