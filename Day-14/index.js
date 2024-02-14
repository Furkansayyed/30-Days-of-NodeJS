const express = require('express');
const cachingMiddleware = require('./cachingMiddleware');
const app = express();

app.use(cachingMiddleware);

// Example route
app.get('/data', (req, res) => {
    // Your route logic here
    const data = { message: 'This is cached data' };
    res.json(data);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
