const User = require("../models/Users");
const Project = require("../models/Projects");
const Task = require("../models/Task");

const createTask = async (req, res) => {
    try {
        const { title, description, project, assignedTo, dueDate } = req.body;

        //check project exists
        const projectId = await Project.findById(project);
        if (!projectId) {
            return res.status(404).json({ message: "Project not found" });
        }

        //check member exists
        const assignedId = await User.findById(assignedTo);
        if (!assignedId) {
            return res.status(404).json({ message: "User mot found" });
        }

        const task = await Task.create({
            title,
            description,
            project,
            assignedTo,
            createdBy: req.user._id,
            dueDate
        })
        const io = req.app.get("io");
        io.emit("taskCreated", task);

        return res.status(201).json(task);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getMyTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ assignedTo: req.user._id })
            .populate("project", "name")
            .populate("createdBy", "name email")

        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const updateTaskStatus = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { status } = req.body;
        const task = await Task.findById(taskId);

        if (!task) {
            return res.staus(404).json({ message: "Task not found" });
        }

        //allowing only assigned user can update
        if (task.assignedTo.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to update this task" });
        }

        task.status = status;
        await task.save();

        const io = req.app.get("io");
        io.to(projectId).emit("taskUpdated", task);

        return res.status(200).json(task);

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getTasksByProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const tasks = await Task.find({ project: projectId })
            .populate("assignedTo", "name email")
            .populate("createdBy", "name")

        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const task = await Task.findById(id);
        console.log(task)
        if (!task) {
            res.status(404).json({ message: "Task not found" });
        }

        //only team-lead can delete
        await task.deleteOne();

        const io = req.app.get("io");
        io.emit("taskDeleted", task)

        return res.status(200).json({ message: "Task deleted successfully" });

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
module.exports = { createTask, getMyTasks, updateTaskStatus, getTasksByProject, deleteTask };