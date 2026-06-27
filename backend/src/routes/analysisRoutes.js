const express = require("express");
const router = express.Router();

const analysisController = require("../controllers/analysisController");
const authenticateUser = require("../middleware/authMiddleware");
const upload = require("../config/multer");

router.post(
    "/resume",
    authenticateUser,
    upload.single("resume"),
    analysisController.analyzeResume
);

module.exports = router;