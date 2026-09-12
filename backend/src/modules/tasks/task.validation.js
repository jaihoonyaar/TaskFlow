const validateTask = (data) => {
    const errors = {};

    if (!data.title || data.title.trim().length === 0) {
        errors.title = "Task title is required";
    }

    if (data.title && data.title.trim().length > 100) {
        errors.title = "Task title cannot exceed 100 characters";
    }

    if (
        data.status &&
        !["TODO", "IN_PROGRESS", "COMPLETED"].includes(data.status)
    ) {
        errors.status = "Invalid task status";
    }

    if (
        data.priority &&
        !["LOW", "MEDIUM", "HIGH"].includes(data.priority)
    ) {
        errors.priority = "Invalid task priority";
    }

    if (
        data.category &&
        !["WORK", "PERSONAL", "STUDY", "PROJECT", "OTHER"].includes(
            data.category
        )
    ) {
        errors.category = "Invalid task category";
    }

    if (
        data.reminder &&
        !["NONE", "10_MINUTES", "15_MINUTES", "30_MINUTES"].includes(
            data.reminder
        )
    ) {
        errors.reminder = "Invalid reminder option";
    }

    return errors;
};

module.exports = {
    validateTask,
};