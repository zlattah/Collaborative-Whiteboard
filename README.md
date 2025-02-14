# Collaborative Whiteboard

## Overview

The **Collaborative Whiteboard** is a real-time drawing application that allows multiple users to draw on a shared canvas. You can use it for collaboration at work, study sessions, playing scribbl, etc. Enjoy!

Example:
<img width="200" alt="whiteboard" src="https://github.com/user-attachments/assets/1481e7f8-85ec-4e6b-b04f-39b2d3dba743" />

## Getting Started

### Prerequisites

Have a HTML & JavaScript environment - you can download VSCode. Install node.js - possible through the [Node.js official website](https://nodejs.org/). Install the ws library for using web sockets.

### Installation

1. Clone the repository:
 Open your terminal/command prompt/powershell and run these commands:
   ```bash
   git clone https://github.com/zlattah/Collaborative-Whiteboard.git
   cd Collaborative-Whiteboard

3. Start the WebSocket server:
   Run this command next:
   ```bash
   node server.js

4. Open the index.html file in your web browser to access the whiteboard. You can open multiple tabs or use different browsers (Chrome, Safari, Opera etc.) to simulate different users.

## Usage
Draw on the canvas using your mouse.
Click the Clear button to remove all drawings from the canvas.
Connect from multiple devices to experience real-time collaboration.

## Code Structure
- index.html: The main HTML file containing the canvas and the clear button.
- client.js: Contains the client-side JavaScript logic for drawing and WebSocket communication.
- server.js: Implements the WebSocket server for managing connections and broadcasting drawing events.

## Logic
