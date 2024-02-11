let jwt = require('jsonwebtoken');
const express = require('express')

const app = express()

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }
    if (token) {
        console.log(token);
        jwt.verify(token, "worldisfullofdevelopers", (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};


app.get('/protected-route', checkToken, (req, res) => {
    // Only authenticated users can access this route
    res.send('Access granted!');
});

// Example route to generate a token (for testing purposes)

function generateToken(payload) {
    return jwt.sign(payload, 'worldisfullofdevelopers'); // Adjust expiresIn as needed
}

app.get('/generate-token', (req, res) =>{
    to = generateToken("furkan")
    res.send(to)
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
