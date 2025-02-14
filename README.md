# Collaborative Whiteboard

## Overview

The **Collaborative Whiteboard** is a real-time drawing application that allows multiple users to draw on a shared canvas. You can use it for collaboration at work, study sessions, playing scribbl, etc. Enjoy!

Example:
![Whiteboard picture](https://github.com/zlattah/Collaborative-Whiteboard/blob/master/whiteboard.png?raw=true)

## Getting Started

### Prerequisites

Have a HTML & JavaScript environment - you can download VSCode. Install node.js - possible through the [Node.js official website](https://nodejs.org/). Install the ws library for using web sockets.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/zlattah/Collaborative-Whiteboard.git
   cd Collaborative-Whiteboard

2. Start the WebSocket server:
  node server.js

4. Open the index.html file in your web browser to access the whiteboard. You can open multiple tabs to simulate different users.

## Usage
Draw on the canvas using your mouse.
Click the Clear button to remove all drawings from the canvas.
Connect from multiple devices to experience real-time collaboration.

## Code Structure
- index.html: The main HTML file containing the canvas and the clear button.
- client.js: Contains the client-side JavaScript logic for drawing and WebSocket communication.
- server.js: Implements the WebSocket server for managing connections and broadcasting drawing events.
