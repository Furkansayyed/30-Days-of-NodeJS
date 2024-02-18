const mongoose = require('mongoose');

// Define the User schema
mongoose.connect('mongodb://127.0.0.1:27017/Node-JS-Challenge');
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true }
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Function to add a new user to the MongoDB database
async function addUser(username, email) {
    try {
        const newUser = new User({ username, email });
        await newUser.save();
        console.log('User added successfully:', newUser);
    } catch (error) {
        console.error('Error adding user:', error);
    }
}

// Usage example:
addUser('john_doe', 'john@example.com');
addUser('Furkan', 'furkan@proton.com');
addUser('Arman', 'arman@gmail.com');
