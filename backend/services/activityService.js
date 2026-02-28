const ActivityLog = require("../models/Activitylog");

exports.logActivity = async ({ userId, action, taskId, projectId }) => {
    const log = new ActivityLog({
        user: userId,
        action,
        task: taskId,
        project: projectId
    });
    await log.save();
};