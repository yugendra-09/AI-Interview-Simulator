const prisma = require("../config/prisma");

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

module.exports = {
    uploadResume
};