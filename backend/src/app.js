const express = require("express");
const app = express();
const authRouter = require("./routes/auth.routes"); 
const cookieParser = require("cookie-parser");

// middlewares
app.use(express.json());
app.use(cookieParser());

// routes 
app.use("/api/auth", authRouter);

module.exports = app;