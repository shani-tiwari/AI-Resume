const express = require("express");
const interviewRouter = express.Router();
const authUser = require("../middlewares/auth.middleware");
const {generateInterviewReport} = require("../controllers/interview.controller");

/**
 * @description route to generate new interview report basis of job description and resume
 * @method POST
 * @url /api/interview/
 * @body {jobDescription: string, resume: string}
 * @returns {pdfBuffer: Buffer}
 * @access private
 */
interviewRouter.post("/", authUser, generateInterviewReport);  


module.exports = interviewRouter;