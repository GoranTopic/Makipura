import initSocket from './socket.js';

function inicialize(){

		return {
				username: null,
				socket: initSocket(),
				isSignedIn: true,
				cookie: null,
		}
}

export default inicialize;
