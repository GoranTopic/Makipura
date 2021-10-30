const middlewareFunction = (socket, next) => { 
		// exaplem of socket middleware 
		console.log("this middleware ran"); 
		next() 
} 

const getUsersRegister = (user_socket, io) => 
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


export default function initializeSocket( io ){
		io.use(middlewareFunction);
		io.on("connection", socket => {
				getUsersRegister(socket, io);
				loadMessagesRegister(socket);
				sendMessageRegister(socket);
				socket.broadcast.emit('new user', { userID: socket.id });
				socket.onAny((event) => {
						console.log(`ANY ${event}`);
				});
				console.log('new user connected: ' + socket.id);
		});
		return io;
}
