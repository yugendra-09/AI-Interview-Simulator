const express = require("express");
const router = express.Router();

const authenticateUser = require("../middleware/authMiddleware");
const historyController = require("../controllers/analysisHistoryController");

router.get(
    "/",
    authenticateUser,
    historyController.getHistory
);

module.exports = router;