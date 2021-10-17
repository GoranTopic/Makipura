import { io } from "socket.io-client";
import fs from "fs";

const socket = io("http://localhost:3000", {
		//rejectUnauthorized: false,
		//cert: fs.readFileSync("../cert.pem"),
		//secure: true,
		autoConnect: false,
});

socket.on("connect", () => {  
		console.log(socket.id); 
		console.log("connected to server"); 
});


let other_users = new Set();

socket.on("users", users => { 
		// catch all event handling
		users.forEach( user => {
				if(user.userID !== socket.id) other_users.add(user.userID)
		}  )
		console.log(other_users);
});

socket.emit("get users");

socket.on("connect_error", (err) => {
  if (err.message === "could not connect to server") {
    this.usernameAlreadySelected = false;
  }
});

let message = "is anybody out there";

socket.emit("private message", { 
		content:  message,
		to: other_users[0],
})


socket.auth = { username: "telix", };

//socket.onAny((event, ...args) => console.log(event, args) );

socket.connect() // manual connect
