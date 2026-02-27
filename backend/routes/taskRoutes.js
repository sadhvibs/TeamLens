const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const { createTask } = require("../controllers/taskController");

router.post("/", protect, authorizeRoles("TEAM_LEAD"), createTask)

module.exports = router;