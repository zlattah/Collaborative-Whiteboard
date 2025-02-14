const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');

let drawing = false;
let color = 'black';
let x_prev = 0;
let y_prev = 0;

let socket;

function connect() {
    socket = new WebSocket('ws://localhost:8080');

    socket.onopen = function () {
        console.log('Connection Successful');
    };

    socket.onerror = function (error) {
        console.error('WebSocket Error:', error);
    };

    socket.onmessage = function (event) {
        const message = JSON.parse(event.data);

        if (message.type === 'init') {
            color = message.color;
        } else if (message.type === 'erase') {
            color = 'white';
        } else if (message.type === 'clear') {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        } else if (message.type === 'history') {
            message.data.forEach((data) => {
                drawfunc(data.x_start, data.y_start, data.x_end, data.y_end, data.color);
            });
        } else if (message.type === 'draw') {
            drawfunc(message.x_start, message.y_start, message.x_end, message.y_end, message.color);
        }
    };

    socket.onclose = function () {
        console.log('Connection closed, attempting to reconnect...');
        setTimeout(connect, 1000); // Attempt to reconnect after 1 second
    };
}

connect();

canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    const screen = canvas.getBoundingClientRect();
    x_prev = e.clientX - screen.left;
    y_prev = e.clientY - screen.top;
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
});

canvas.addEventListener('mousemove', (e) => {
    if (drawing) {
        const screen = canvas.getBoundingClientRect();
        const x = e.clientX - screen.left;
        const y = e.clientY - screen.top;

        drawfunc(x_prev, y_prev, x, y, color);
        const data = { type: 'draw', x_start: x_prev, y_start: y_prev, x_end: x, y_end: y, color: color };
        socket.send(JSON.stringify(data));

        x_prev = x;
        y_prev = y;
    }
});

const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const data = { type: 'clear' };
    socket.send(JSON.stringify(data));
});

function drawfunc(x_start, y_start, x_end, y_end, color) {
    ctx.beginPath();
    ctx.moveTo(x_start, y_start);
    ctx.lineTo(x_end, y_end);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();
}
