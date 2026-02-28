
const User = require("../models/Users");
const Project = require("../models/Projects");

const createProject = async (req, res) => {
    try {
        const { name, description } = req.body;

        const project = await Project.create({
            name,
            description,
            createdBy: req.user._id,
            members: [req.user._id]
        })
        return res.status(201).json(project);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const addMemberToProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        //checking if project exists
        const project = await Project.findById(id);
        if (!project) {
            res.status(404).json({ message: "Project not found" });
        }

        //checking if user exists
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }

        //only TEAM_LEAD can modify project
        if (project.createdBy.toString() !== req.user._id.toString()) {
            res.status(403).json({ message: "Not authorized" });
        }

        //preventing duplicate members
        if (project.members.includes(userId)) {
            res.status(400).json({ message: "User already a member" });
        }

        project.members.push(userId);
        await project.save();

        return res.status(200).json({ message: "Member added successfully" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { createProject, addMemberToProject };