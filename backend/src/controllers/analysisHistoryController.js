const analysisService = require("../services/analysisService");

const getHistory = async (req, res) => {
    try {

        const history = await analysisService.getAnalysisHistory(req.user.id);

        res.status(200).json({
            success: true,
            message: "Analysis history fetched successfully",
            data: history
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    getHistory
};