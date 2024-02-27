const express = require('express')
const app = express()
const authenticateAndAuthorize = require('./authenticateAndAuthorize');

app.get('/admin', authenticateAndAuthorize, (req, res) => {
    res.send('Admin dashboard');
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});