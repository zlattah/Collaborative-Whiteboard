const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

const clients = new Map();
const drawingHistory = [];

server.on('connection', (socket) => {
    console.log('New client connected');

    const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    clients.set(socket, color);

    socket.send(JSON.stringify({ type: 'init', color: color }));
    socket.send(JSON.stringify({ type: 'history', data: drawingHistory }));

    socket.on('message', (message) => {
        console.log('Received:', message);

        const data = JSON.parse(message);

        if (data.type === 'clear') { //pressed the clear button
            //deleting history
            drawingHistory.length = 0;

            //updating 
            clients.forEach((_, client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(data));
                }
            });
        } else {
            data.color = clients.get(socket);
            drawingHistory.push(data);

            clients.forEach((_, client) => {
                if (client !== socket && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(data));
                }
            });
        }
    });

    socket.on('close', () => {
        console.log('Client disconnected');
        clients.delete(socket);
    });
});

console.log('WebSocket server is running on ws://localhost:8080');