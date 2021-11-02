import io from "socket.io-client/dist/socket.io"; 
import { BASE_API } from '@env';

export default function initSocket() {
		console.log("[from inicilizer socket]")
		console.log('BASE_API:');
		console.log(BASE_API);
		const socket = io( BASE_API, { jsonp: false } );

		if(socket){
				console.log("got socket:");
				//console.log(socket);
				//props.setSocket(socket);
				//console.log("dispatched socket");
		}

		socket.onAny((event) => {
				console.log(`ANY ${event}`);
		});
		socket.on("connect_error", () => {  
				//console.log("connection error");
				setTimeout(() => {    
						socket.connect();  
				}, 1000);});
		socket.on("disconnect", (reason) => {
				console.log("disconected");
		});
		return socket;
}

