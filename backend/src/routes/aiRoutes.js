const express = require("express");

const router = express.Router();

const aiController = require("../controllers/aiController");

const authenticateUser = require("../middleware/authMiddleware");

const upload = require("../config/multer");

router.post(
    "/analyze",
    authenticateUser,
    upload.single("resume"),
    aiController.analyzeResume
);

module.exports = router;