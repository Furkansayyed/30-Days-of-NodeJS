// Middleware function for error handling
function errorHandler(err, req, res, next) {
    console.error('Error:', err);
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let errorMessage = 'Internal Server Error';

    if (err instanceof SyntaxError && 'body' in err) {
        statusCode = 400;
        errorMessage = 'Invalid JSON payload';
    } else if (err.name === 'ValidationError') {
        statusCode = 400;
        errorMessage = err.message;
    }
    res.status(statusCode).json({ error: errorMessage });
}

module.exports = errorHandler;
