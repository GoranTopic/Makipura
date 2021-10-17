import express from 'express';
import { createServer } from 'http';
import { Server } from "socket.io";
import fs from 'fs';

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const app = express();

const credentials = {
		key: fs.readFileSync('../key.pem'),
		cert: fs.readFileSync('../cert.pem'),
		ca: fs.readFileSync('../csr.pem'),
		requestCert: false,
		rejectUnauthorized: false
};


// create https server
const server = createServer(credentials, app);

const io = new Server(server, { cors: 
		{
				origin: "http://localhost:8080", 
		}, 
});

app.get('/', (req, res) => {
  res.sendFile('/home/telix/Makipura/testing/testing-socket.io/server/index.html');
});


io.on("connection", (socket) => {
  console.log('new user connected');
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }
  socket.emit("users", users);
});


io.on("d", (socket) => {
  console.log('new user connected');
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }
  socket.emit("users", users);
});

io.on("private message", ({ content, to }) => {
		socket.to(to).emit("private message", { 
				content: content,
				from: socket.id,  
		})
})

io.on("get users", (input) =>{  
		console.log(" get user server ran");
		console.log(input);
})

server.listen(3000, () => console.log('listening on http://localhost:3000'));
