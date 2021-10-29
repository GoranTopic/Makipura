import io from "socket.io-client/dist/socket.io"; 

export default function initSocket() {
		const socket = io( 'http://192.168.1.219:3000',
				{ jsonp: false }
		);

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

/* 
const [socket, setSocket] = useState( 
				io(
						//"http://10.0.0.3:3000", 
						'http://192.168.1.219:3000',
						{ jsonp: false }
					)
				);
console.log("printing from App:");
console.log(store)

		if(socket){
				console.log("got socket:");
				console.log(socket);
				props.setSocket(socket);
				console.log("dispatched socket");
		}

		useEffect(() => { 
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
		} , [])
		*/

