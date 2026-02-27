const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const { createProject } = require("../controllers/projectController");

router.post("/", protect, authorizeRoles("TEAM_LEAD"), createProject);

module.exports = router;