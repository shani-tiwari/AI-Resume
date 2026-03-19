const mongoose = require("mongoose");

const BlackListSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [ true, "token is required"],
    }
}, {timestamps: true});

const BlackListModel = mongoose.model("BlackList", BlackListSchema);

module.exports = BlackListModel;