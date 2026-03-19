const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, "name is required"],
        unique: [ true, "name already exists"],
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
        select: false,
    },    
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel; 