const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Task title is required"],
            trim: true,
            minlength: 1,
            maxlength: 100,
        },

        description: {
            type: String,
            trim: true,
            maxlength: 1000,
            default: "",
        },

        status: {
            type: String,
            enum: ["TODO", "IN_PROGRESS", "COMPLETED"],
            default: "TODO",
        },

        priority: {
            type: String,
            enum: ["LOW", "MEDIUM", "HIGH"],
            default: "MEDIUM",
        },

        category: {
            type: String,
            enum: ["WORK", "PERSONAL", "STUDY", "PROJECT", "OTHER"],
            default: "OTHER",
        },

        dueDate: {
            type: Date,
            default: null,
        },
        reminder: {
            type: String,
            enum: [
                'NONE',
                '10_MINUTES',
                '15_MINUTES',
                '30_MINUTES'
            ],
            default: 'NONE'
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Task", taskSchema);