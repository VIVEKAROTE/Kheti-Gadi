const errorHandler = (err, req, res, next) => {
    // If the status code is 200, but there's an error, make it 500

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        message: err.message,
        // Only show the stack trace if we are in development mode
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

export { errorHandler }