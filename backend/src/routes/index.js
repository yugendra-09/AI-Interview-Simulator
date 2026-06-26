const express = require("express");

const router = express.Router();

const authRoutes = require("./authRoutes");
const resumeRoutes = require("./resumeRoutes");

router.use("/auth", authRoutes);
router.use("/resume", resumeRoutes);

router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "AI Interview Simulator Backend is Running 🚀"
    });
});

module.exports = router;