import initSocket from './socket.js';
//import loginUser from './login';

export default initUser = {
		// user data from memory,
		// 		validate cookie with server
		// get coockie from memory
		// check cookie 
		username: null,
		firstname: null,
		latname: null,
		socket: initSocket(),
		isSignedIn: false,
		cookie: null,
}

