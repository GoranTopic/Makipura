import initSocket from './socket.js';

//import loginUser from './login';


function inicialize(){
		// user data from memory,
		// 		validate cookie with server
		// get coockie from memory
		// check cookie 
		return {
				username: null,
				socket: initSocket(),
				isSignedIn: false,
				cookie: null,
		}
}

export default inicialize;
