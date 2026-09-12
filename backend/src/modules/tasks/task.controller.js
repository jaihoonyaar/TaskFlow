const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
} = require("./task.service");

const { validateTask } = require("./task.validation");

const create = async (req, res, next) => {
    try {
        const errors = validateTask(req.body);

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors,
            });
        }

        const task = await createTask(
            req.body,
            req.user.userId
        );

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: {
                task,
            },
        });
    } catch (error) {
        next(error);
    }
};

const getAll = async (req, res, next) => {
    try {
        const tasks = await getTasks(req.user.userId);

        res.status(200).json({
            success: true,
            data: {
                tasks,
            },
        });
    } catch (error) {
        next(error);
    }
};

const getOne = async (req, res, next) => {
    try {
        const task = await getTaskById(
            req.params.id,
            req.user.userId
        );

        res.status(200).json({
            success: true,
            data: {
                task,
            },
        });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const errors = validateTask({
            ...req.body,
            title: req.body.title || "valid",
        });

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors,
            });
        }

        const task = await updateTask(
            req.params.id,
            req.user.userId,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: {
                task,
            },
        });
    } catch (error) {
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        await deleteTask(
            req.params.id,
            req.user.userId
        );

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    create,
    getAll,
    getOne,
    update,
    remove,
};