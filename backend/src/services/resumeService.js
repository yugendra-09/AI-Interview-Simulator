const prisma = require("../config/prisma");
const fs = require("fs");
const path = require("path");

const uploadResume = async (userId, file) => {

    if (!file) {
        throw new Error("Please upload a PDF resume");
    }

    const resume = await prisma.resume.create({
        data: {
            fileName: file.filename,
            filePath: file.path,
            userId: userId
        }
    });

    return resume;
};
const getUserResumes = async (userId) => {
    const resumes = await prisma.resume.findMany({
        where: {
            userId
        },
        orderBy: {
            uploadedAt: "desc"
        }
    });

    return resumes;
};
const getResumeById = async (userId, resumeId) => {

    const resume = await prisma.resume.findFirst({
        where: {
            id: Number(resumeId),
            userId
        }
    });

    if (!resume) {
        throw new Error("Resume not found");
    }

    return resume;
};
const deleteResume = async (userId, resumeId) => {

    const resume = await prisma.resume.findFirst({
        where: {
            id: Number(resumeId),
            userId
        }
    });

    if (!resume) {
        throw new Error("Resume not found");
    }

    // Delete the file if it exists
    if (fs.existsSync(resume.filePath)) {
        fs.unlinkSync(resume.filePath);
    }

    // Delete the database record
    await prisma.resume.delete({
        where: {
            id: resume.id
        }
    });

    return {
        message: "Resume deleted successfully"
    };
};
module.exports = {
    uploadResume,
    getUserResumes,
    getResumeById,
    deleteResume
};