const { logActivity } = require('../services/activityService');

exports.createTask = async (req, res) => {
  const { title, description, project, assignedTo } = req.body;
  try {
    const task = await Task.create({
      title,
      description,
      project,
      assignedTo,
      createdBy: req.user._id
    });

    // Log activity
    await logActivity({
      userId: req.user._id,
      action: 'Created Task',
      taskId: task._id,
      projectId: project
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};