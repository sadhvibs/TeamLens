const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const { createTask, getMyTasks, updateTaskStatus, getTasksByProject, deleteTask } = require("../controllers/taskController");

router.post("/", protect, authorizeRoles("TEAM_LEAD"), createTask);
router.get("/my-tasks", protect, getMyTasks);
router.patch("/:id/status", protect, updateTaskStatus);
router.get("/project/:projectId", protect, getTasksByProject);
router.put("/:taskId/status", protect, updateTaskStatus);
router.delete("/:id", protect, authorizeRoles("TEAM_LEAD"), deleteTask)

module.exports = router;