const express = require("express");

const router = express.Router();

const authRoutes = require("./authRoutes");

router.use("/auth", authRoutes);

router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "AI Interview Simulator Backend is Running 🚀"
    });
});

module.exports = router;