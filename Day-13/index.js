const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Function to serve HTML page with JavaScript to establish WebSocket connection
function serveWebSocketPage(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
}

// WebSocket server for Express
function setupWebSocket(server) {
    wss.on('connection', (ws) => {
        console.log('Client connected');

        ws.on('message', (message) => {
            console.log('Received message:', message.toString());
            // ws.send(message);
        });

        // WebSocket close event handler
        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });
}

// Serve WebSocket HTML page at /websocket endpoint
app.get('/websocket', serveWebSocketPage);

// Setup WebSocket server
setupWebSocket(server);

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
