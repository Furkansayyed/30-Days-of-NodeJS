const express = require('express');
const loggingMiddleware = require('./loggingMiddleware');
const app = express();

app.use(express.json());
app.use(loggingMiddleware);

const PORT = 3000;

app.get('/', (req, res) => {
    res.send("Hello Furkan");
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
