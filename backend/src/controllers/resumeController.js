const resumeService = require("../services/resumeService");

const uploadResume = async (req, res) => {
    try {

        const resume = await resumeService.uploadResume(
            req.user.id,
            req.file
        );

        res.status(201).json({
            success: true,
            message: "Resume uploaded successfully",
            data: resume
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    uploadResume
};