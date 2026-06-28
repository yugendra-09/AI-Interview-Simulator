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
const saveAnswer = async (
    sessionId,
    questionId,
    answer,
    aiFeedback,
    aiScore
) => {

    return await prisma.interviewAnswer.create({
        data: {
            sessionId,
            questionId,
            answer,
            aiFeedback,
            aiScore
        }
    });

};
const finishInterview = async (sessionId) => {
    

    const answers = await prisma.interviewAnswer.findMany({
        where: {
            sessionId: Number(sessionId)
        }
    });

    let averageScore = 0;

    if (answers.length > 0) {
        const total = answers.reduce((sum, answer) => sum + (answer.aiScore || 0), 0);
        averageScore = total / answers.length;
    }

    const session = await prisma.interviewSession.update({
        where: {
            id: Number(sessionId)
        },
        data: {
            status: "COMPLETED",
            score: averageScore,
            endedAt: new Date()
        }
    });

    return {
        session,
        averageScore
    };
};
const saveInterviewReport = async (sessionId, report) => {

    return await prisma.interviewReport.create({
        data: {
            sessionId,
            overallScore: report.overallScore,
            report
        }
    });

};
module.exports = {
    createInterviewSession,
    generateQuestions,
    getSessionQuestions,
    saveAnswer,
    finishInterview,
    saveInterviewReport
};