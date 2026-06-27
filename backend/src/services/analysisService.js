const prisma = require("../config/prisma");

const saveAnalysis = async (userId, resumeId, analysis) => {

    const savedAnalysis = await prisma.resumeAnalysis.create({
        data: {
            userId,
            resumeId,
            analysis
        }
    });

    return savedAnalysis;
};

const getAnalysisHistory = async (userId) => {

    const history = await prisma.resumeAnalysis.findMany({
        where: {
            userId
        },
        include: {
            resume: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return history;
};

module.exports = {
    saveAnalysis,
    getAnalysisHistory
};