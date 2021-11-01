import io from "socket.io-client/dist/socket.io"; 
//import Config from "react-native-config";

export default function initSocket() {
		//console.log('BASE_API:');
		//console.log(Config);
		const socket = io( 'http://192.168.1.193:5000', { jsonp: false } );

		if(socket){
				console.log("from inicilizer socket")
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

