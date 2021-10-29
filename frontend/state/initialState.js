import initSocket from '../inicializers/socket.js';

const initialState = {
		username: null,
		socket: initSocket(),
		isSignedIn: true,
		cookie: null,
};

export default initialState;
