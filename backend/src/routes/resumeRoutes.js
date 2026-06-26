const express = require("express");
const router = express.Router();


const resumeController = require("../controllers/resumeController");
const authenticateUser = require("../middleware/authMiddleware");
const upload = require("../config/multer");
router.get(
    "/",
    authenticateUser,
    resumeController.getUserResumes
);
router.get(
    "/:id",
    authenticateUser,
    resumeController.getResumeById
);
router.delete(
    "/:id",
    authenticateUser,
    resumeController.deleteResume
);
router.post(
    "/upload",
    authenticateUser,
    upload.single("resume"),
    resumeController.uploadResume
);

module.exports = router;