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

io.on("get users", () => {  
		console.log("get users ran");
		const users = [];
		for (let [id, socket] of io.of("/").sockets) {
				users.push({
						userID: id,
						username: socket.username,
				});
		}
		socket.emit("users", users);
});

const getUsersRegister = user_socket => 
		user_socket.on("get users", () => {  
				//console.log("get users ran");
				const users = [];
				for (let [id, socket] of io.of("/").sockets) {
						//console.log(user_socket.id);
						//console.log(id);
						if(user_socket.id !== id) 
								users.push({
										userID: id,
										username: socket.username,
								});
				}
				user_socket.emit("users", users);
		});	

const sendMessageRegister = socket => {
		socket.on("message", message => {  
				let to = message[0].to.userID;
				console.log("server sending message to: " + to);
				console.log(to);
				socket.to(to).emit('message', {
						...message[0],
						from: socket.id,
						content: message.content,
				});	
		});
}


const loadMessagesRegister = socket => {
		socket.on("load-messages", () => {  
				socket.emit('load-messages', [
						{
								text: 'Hello world',
								user: { _id: 'program'  },
								createdAt: '2021-10-19T19:05:22.928Z',
								_id: 'afbbe0fb-3778-4d9b-9aea-5a93b27d253d',
								to: { userID: 'W7-_D8-We0Q8uJW4AAAJ'  }
						},{
								text: 'Hello developer',
								user: { _id: socket.id  },
								createdAt: '2021-10-19T19:05:22.928Z',
								_id: 'afbbe0fb-37ac-4d9b-9aea-5a93b27d223',
								to: { userID: 'W7-_D8-We0Q8uJW4AAAJ'  }
						},
				]
				);	
		});
}


io.on("connection", socket => {
		getUsersRegister(socket);
		loadMessagesRegister(socket);
		sendMessageRegister(socket);
		socket.broadcast.emit('new user', { userID: socket.id });
		socket.onAny((event) => {
				console.log(`ANY ${event}`);
		});
		console.log('new user connected: ' + socket.id);

});


server.listen(3000, 
		//'192.168.1.219',
		'10.0.0.3',
		() => console.log('listening on http://localhost:3000'));
