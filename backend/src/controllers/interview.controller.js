const pdfParse = require("pdf-parse");
const {generateInterviewReport} = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");


const InterviewReportController = async (req, res) => {

    try {

        const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();
        const {selfDescription, jobDescription} = req.body;

        if(!selfDescription || !jobDescription || !req.file) {
            return res.status(400).json({message: "All fields are required..."});
        };  

        const interviewReportAI = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription, 
            jobDescription
        });

        const interviewReport = await interviewReportModel.create({
            jobDescription,
            selfDescription,
            user: req.user.id,
            resume: resumeContent.text,
            ...interviewReportAI
        }); 

        return res.status(201).json({message: "Interview report generated successfully...", interviewReport});


    } catch (error) {

        console.log(error);
        return res.status(500).json({message: "Internal server error..."});

    };

};


module.exports = { 
    InterviewReportController 
};