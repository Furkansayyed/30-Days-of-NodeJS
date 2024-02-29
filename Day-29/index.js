const express = require('express');
const errorHandler = require('./errorHandler');

const app = express();

app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
