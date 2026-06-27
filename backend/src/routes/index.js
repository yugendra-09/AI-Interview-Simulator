const express = require("express");

const router = express.Router();

const authRoutes = require("./authRoutes");
const resumeRoutes = require("./resumeRoutes");
const analysisRoutes = require("./analysisRoutes");
const aiRoutes = require("./aiRoutes");
const historyRoutes = require("./historyRoutes");
const interviewRoutes = require("./interviewRoutes");

router.use("/auth", authRoutes);
router.use("/resume", resumeRoutes);
router.use("/analysis", analysisRoutes);
router.use("/ai", aiRoutes);
router.use("/history", historyRoutes);
router.use("/interview", interviewRoutes);
router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "AI Interview Simulator Backend is Running 🚀"
    });
});

module.exports = router;