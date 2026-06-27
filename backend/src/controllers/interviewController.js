const interviewService = require("../services/interviewService");
const aiService = require("../services/aiService");
const prisma = require("../config/prisma");

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
const submitAnswer = async (req, res) => {

    try {

        const { questionId, answer } = req.body;

        const question = await prisma.interviewQuestion.findUnique({
            where: {
                id: questionId
            }
        });

        if (!question) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }

        const evaluation = await aiService.evaluateAnswer(
            question.question,
            answer
        );

        const savedAnswer = await interviewService.saveAnswer(
            question.sessionId,
            answer,
            evaluation.feedback,
            evaluation.score
        );

        res.status(201).json({
            success: true,
            message: "Answer evaluated successfully",
            data: {
                savedAnswer,
                evaluation
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
const finishInterview = async (req, res) => {

    try {

        const result = await interviewService.finishInterview(
            req.params.sessionId
        );

        res.status(200).json({
            success: true,
            message: "Interview completed successfully",
            data: result
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
    getQuestions,
    submitAnswer,
    finishInterview
};