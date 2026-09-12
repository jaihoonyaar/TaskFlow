const Task = require("./task.model");

const createTask = async (taskData, userId) => {
    const task = await Task.create({
        ...taskData,
        userId,
    });

    return task;
};

const getTasks = async (userId) => {
    return await Task.find({ userId }).sort({ createdAt: -1 });
};

const getTaskById = async (taskId, userId) => {
    const task = await Task.findOne({
        _id: taskId,
        userId,
    });

    if (!task) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }

    return task;
};

const updateTask = async (taskId, userId, updateData) => {
    const task = await Task.findOneAndUpdate(
        {
            _id: taskId,
            userId,
        },
        updateData,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!task) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }

    return task;
};

const deleteTask = async (taskId, userId) => {
    const task = await Task.findOneAndDelete({
        _id: taskId,
        userId,
    });

    if (!task) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }

    return task;
};

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
};