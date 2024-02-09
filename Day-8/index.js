const express = require('express');
const app = express();

// Route handler to check if "number" parameter is a positive integer
app.get('/positive', (req, res, next) => {
    const number = parseInt(req.query.number);
    if (!Number.isInteger(number) || number <= 0) {
        const error = new Error('The "number" parameter must be a positive integer');
        error.status = 400; // Set the status code to 400 Bad Request
        next(error); // Pass the error to the next middleware
    } else {
        res.send(`The number ${number} is valid`);
    }
});

// Error handling middleware to catch specific error
app.use((err, req, res, next) => {
    if (err.status === 400) {
        res.status(400).send(err.message);
    } else {
        next(err); // Pass the error to the default error handler
    }
});

// Default error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
