const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');

let drawing = false;
let color = 'black'; // default, will change later 
let lastX = 0;
let lastY = 0;

const socket = new WebSocket('ws://localhost:8080');

socket.onopen = function () {
    console.log('WebSocket connection established');
};

socket.onerror = function (error) {
    console.error('WebSocket Error:', error);
};

socket.onmessage = function (event) {
    const message = JSON.parse(event.data);

    //First connection established
    if (message.type === 'init') {
        color = message.color;
    } else if (message.type === 'erase'){ //for eraser TBD
        color = 'white';
    } else if (message.type === 'clear'){ //clicked on clear button
         ctx.clearRect(0, 0, canvas.width, canvas.height);
    } else if (message.type === 'history') { //for loading previous history
        message.data.forEach((data) => {
            drawLine(data.startX, data.startY, data.endX, data.endY, data.color);
        });
    } else if (message.type === 'draw') {
        drawLine(message.startX, message.startY, message.endX, message.endY, message.color);
    }
};

//Finding start and end positions
canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    const rect = canvas.getBoundingClientRect();
    lastX = e.clientX - rect.left;
    lastY = e.clientY - rect.top;
});
canvas.addEventListener('mouseup', () => {
    drawing = false;
});

//Moving mouse
canvas.addEventListener('mousemove', (e) => {
    if (drawing) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        //drawing & sending to the server
        drawLine(lastX, lastY, x, y, color);
        const data = { type: 'draw', startX: lastX, startY: lastY, endX: x, endY: y, color: color };
        socket.send(JSON.stringify(data));

        //end position changed
        lastX = x;
        lastY = y;
    }
});

const clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', () => {
    //clear canvas & send to server
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const data = { type: 'clear' };
    socket.send(JSON.stringify(data));

});

//helper function for drawing
function drawLine(startX, startY, endX, endY, color) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.stroke();
}