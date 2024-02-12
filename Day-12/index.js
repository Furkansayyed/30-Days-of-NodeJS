const express = require('express');
const app = express();

// Define a map to store request counts for each IP address
const requestCounts = new Map();

// Rate-limiting middleware for Express
function rateLimitMiddleware(req, res, next) {
    const maxRequestsPerMinute = 5;
    const ipAddress = req.ip;

    if (!requestCounts.has(ipAddress)) {
        requestCounts.set(ipAddress, 1);
    } else {
        const count = requestCounts.get(ipAddress);
        requestCounts.set(ipAddress, count + 1);
    }

    if (requestCounts.get(ipAddress) > maxRequestsPerMinute) {
        return res.status(429).json({ 'error Message': 'Get request Limit Exceeeded' });
    }

    next();
}

app.use(rateLimitMiddleware);

app.get('/', (req, res) => {
    res.json({ 'message': "Hello Furkan" })
    // res.json().send('Hello World!')
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
