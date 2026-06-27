const express = require("express");
const router = express.Router();

const interviewController = require("../controllers/interviewController");
const authenticateUser = require("../middleware/authMiddleware");

router.post(
    "/start",
    authenticateUser,
    interviewController.startInterview
);
router.get(
    "/:sessionId/questions",
    authenticateUser,
    interviewController.getQuestions
);
router.post(
    "/answer",
    authenticateUser,
    interviewController.submitAnswer
);
router.post(
    "/:sessionId/finish",
    authenticateUser,
    interviewController.finishInterview
);

module.exports = router;