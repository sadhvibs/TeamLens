const Project = require("../models/Projects");
const Task = require("../models/Task");

const getDashboardStats = async (req, res) => {
    try {
        const userId = req.user._id;

        //total project user is part of
        const totalProjects = await Project.countDocuments({ members: userId });

        //total tasks assigned to user
        const totalTasks = await Task.countDocuments({ assignedTo: userId });

        //task by status
        const taskByStatus = await Task.aggregate([
            { $match: { assignedTo: userId } },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ])

        return res.status(200).json({ totalProjects, totalTasks, taskByStatus })

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { getDashboardStats }