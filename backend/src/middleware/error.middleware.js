const errorMiddleware = (
    err,
    req,
    res,
    next
) => {
    const statusCode =
        err.statusCode || 500;

    if (
        process.env.NODE_ENV !==
        "production"
    ) {
        console.error(err);
    } else {
        console.error(
            `${req.method} ${req.originalUrl} - ${statusCode}`
        );
    }

    res.status(statusCode).json({
        success: false,
        message:
            statusCode === 500 &&
            process.env.NODE_ENV ===
            "production"
                ? "Internal server error"
                : err.message ||
                "Internal server error",
    });
};

module.exports = errorMiddleware;