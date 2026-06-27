const prisma = require("../config/prisma");

const createInterviewSession = async (userId, analysisId) => {

    const session = await prisma.interviewSession.create({
        data: {
            userId,
            analysisId
        }
    });

    return session;
};
const generateQuestions = async (sessionId, analysisId) => {


    const analysis = await prisma.resumeAnalysis.findUnique({
        where: {
            id: analysisId
        }
    });

  

    const technicalQuestions = analysis.analysis.technicalQuestions || [];
    const hrQuestions = analysis.analysis.hrQuestions || [];

    
    const questions = [];

    technicalQuestions.forEach(question => {
        questions.push({
            question,
            category: "TECHNICAL",
            sessionId
        });
    });

    hrQuestions.forEach(question => {
        questions.push({
            question,
            category: "HR",
            sessionId
        });
    });
    const getSessionQuestions = async (sessionId) => {

    const questions = await prisma.interviewQuestion.findMany({
        where: {
            sessionId: Number(sessionId)
        },
        orderBy: {
            id: "asc"
        }
    });

    return questions;
};
    

    await prisma.interviewQuestion.createMany({
        data: questions
    });

    return questions;
};
const getSessionQuestions = async (sessionId) => {

    const questions = await prisma.interviewQuestion.findMany({
        where: {
            sessionId: Number(sessionId)
        },
        orderBy: {
            id: "asc"
        }
    });

    return questions;
};

module.exports = {
    createInterviewSession,
    generateQuestions,
    getSessionQuestions
};