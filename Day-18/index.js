const express = require('express');
const mongoose = require('mongoose');

const app = express();

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true }
});


const User = mongoose.model('User', userSchema);
mongoose.connect('mongodb://127.0.0.1:27017/Node-JS-Challenge');

async function getAllUsers(req, res) {
    try {
        const users = await User.find({});
        if (users.length == 0) {
            res.send("No Users found")
        }
        else {
            res.json(users);
        }
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
app.get('/users', getAllUsers);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
