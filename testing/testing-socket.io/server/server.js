/*
import { Server } from "socket.io";
const io = new Server();
io.on("connection", socket => { 
		console.log("server got connection")
		console.log(socket);
});

io.listen(3000, ()=> { console.log("listening on wss://localhost:3000") });
*/

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
