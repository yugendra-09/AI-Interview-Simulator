const express = require("express");

const router = express.Router();

const authRoutes = require("./authRoutes");
const resumeRoutes = require("./resumeRoutes");
const analysisRoutes = require("./analysisRoutes");

router.use("/auth", authRoutes);
router.use("/resume", resumeRoutes);
router.use("/analysis", analysisRoutes);

router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "AI Interview Simulator Backend is Running 🚀"
    });
});

module.exports = router;