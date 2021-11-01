import initSocket from './socket.js';
//import loginUser from './login';

function inicialize(){
	//	login 

		return {
				username: null,
				socket: initSocket(),
				isSignedIn: true,
				cookie: null,
		}
}

export default inicialize;
