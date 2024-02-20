const express = require('express')
const mongoose = require('mongoose')

const app = express()

const userSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String },
    age: { type: Intl }
});

const user = mongoose.model('User', userSchema);
mongoose.connect('mongodb://127.0.0.1:27017/Node-JS-Challenge');

async function getAverageAge(req, res) {
    try {
        const result = await user.aggregate([
            {
                $group: {
                    _id: null,
                    averageAge: { $avg: '$age' }
                }
            }
        ])
        const averageAge = result.length > 0 ? result[0].averageAge : 0
        res.json({ averageAge })
    } catch (error) {
        console.log("Error getting the Age of the Users.....");
    }
}

app.get('/age', getAverageAge);

app.listen(3000, () =>{
    console.log("Server listening on port 3000");
})