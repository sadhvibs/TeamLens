const Project = require("../models/Projects");

exports.createProject = async (req, res) => {
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