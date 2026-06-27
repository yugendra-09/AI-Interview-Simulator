const pdfService = require("../services/pdfService");

const analyzeResume = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a PDF"
            });
        }

        const extractedText = await pdfService.extractTextFromPDF(
            req.file.path
        );

        res.status(200).json({
            success: true,
            message: "Resume text extracted successfully",
            data: {
                text: extractedText
            }
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