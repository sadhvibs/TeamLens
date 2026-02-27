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
        return res.status(201).json(task);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { createTask };