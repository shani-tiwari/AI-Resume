const mongoose = require("mongoose");

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("connected to db");
    } catch (error) {
        console.log(`${error.message || error} - error while connecting to db`);
    }
}

module.exports = connectToDB