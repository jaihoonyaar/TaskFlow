require("dotenv").config();

const app = require("./app");
const connectDatabase = require("./config/database");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDatabase();

        const server = app.listen(
            PORT,
            () => {
                console.log(
                    `TaskFlow server running on port ${PORT}`
                );
            }
        );

        const shutdown = (signal) => {
            console.log(
                `${signal} received. Shutting down...`
            );

            server.close(() => {
                console.log(
                    "TaskFlow server stopped."
                );

                process.exit(0);
            });
        };

        process.on(
            "SIGTERM",
            () => shutdown("SIGTERM")
        );

        process.on(
            "SIGINT",
            () => shutdown("SIGINT")
        );
    } catch (error) {
        console.error(
            "Server startup failed:",
            error.message
        );

        process.exit(1);
    }
};

startServer();