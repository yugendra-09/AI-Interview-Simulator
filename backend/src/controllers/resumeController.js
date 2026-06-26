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
const getUserResumes = async (req, res) => {
    try {

        const resumes = await resumeService.getUserResumes(req.user.id);

        res.status(200).json({
            success: true,
            message: "Resumes fetched successfully",
            data: resumes
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
const getResumeById = async (req, res) => {
    try {

        const resume = await resumeService.getResumeById(
            req.user.id,
            req.params.id
        );

        res.status(200).json({
            success: true,
            message: "Resume fetched successfully",
            data: resume
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });

    }
};
const deleteResume = async (req, res) => {
    try {

        const result = await resumeService.deleteResume(
            req.user.id,
            req.params.id
        );

        res.status(200).json({
            success: true,
            message: result.message
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    uploadResume,
    getUserResumes,
    getResumeById,
    deleteResume
};