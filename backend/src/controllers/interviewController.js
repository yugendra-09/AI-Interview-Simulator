const interviewService = require("../services/interviewService");

const startInterview = async (req, res) => {

    try {

        const { analysisId } = req.body;

        const session = await interviewService.createInterviewSession(
    req.user.id,
    analysisId
);

await interviewService.generateQuestions(
    session.id,
    analysisId
);
        res.status(201).json({
            success: true,
            message: "Interview session started successfully",
            data: session
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};
const getQuestions = async (req, res) => {

    try {

        const questions = await interviewService.getSessionQuestions(
            req.params.sessionId
        );

        res.status(200).json({
            success: true,
            data: questions
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    startInterview,
    getQuestions
};