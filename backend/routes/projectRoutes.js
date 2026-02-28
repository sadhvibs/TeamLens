const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const { createProject, addMemberToProject } = require("../controllers/projectController");

router.post("/", protect, authorizeRoles("TEAM_LEAD"), createProject);
router.put("/:id/add-member", protect, authorizeRoles("TEAM_LEAD"), addMemberToProject);

module.exports = router;