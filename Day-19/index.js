const express = require('express');
const mongoose = require('mongoose');

const app = express();

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    }
});

const User = mongoose.model('User', userSchema);
mongoose.connect('mongodb://127.0.0.1:27017/Node-JS-Challenge');

async function addUser(username, email) {
    try {
        const newUser = new User({ username, email });
        await newUser.validate(); 
        await newUser.save();
        console.log('User added successfully:', newUser);
    } catch (error) {
        console.error('Error adding user:', error.message);
    }
}

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

addUser('john_doe', 'john@john@example.com'); // Invalid email format
addUser('Furkan Sayyed ', 'furkan115@gmail.com'); // valid email format