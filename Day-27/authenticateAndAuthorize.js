const jwt = require('jsonwebtoken');
const secretKey = 'worldisfullofdevelopers';

const users = [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
    { id: 2, username: 'user', password: 'user123', role: 'user' }
];

function authenticateAndAuthorize(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Token missing->>' + token });
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        const user = users.find(u => u.id === decoded.id);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = authenticateAndAuthorize;
