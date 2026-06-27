const pdfService = require("../services/pdfService");
const aiService = require("../services/aiService");
const analysisService = require("../services/analysisService");
const prisma = require("../config/prisma");

const analyzeResume = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: "Please upload a PDF"
            });

        }

        const text = await pdfService.extractTextFromPDF(
            req.file.path
        );

        const analysis = await aiService.analyzeResume(text);
        const latestResume = await prisma.resume.findFirst({
    where: {
        userId: req.user.id
    },
    orderBy: {
        uploadedAt: "desc"
    }
});

await analysisService.saveAnalysis(
    req.user.id,
    latestResume.id,
    analysis
);
console.log("Analysis saved successfully");

        res.status(200).json({
    success: true,
    message: "Resume analyzed successfully",
    data: analysis
});

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    analyzeResume
};