import inicialize from '../inicializers/userInicializer.js'; 

const initialState = inicialize() || {
		username: null,
		socket: null,
		isSignedIn: null,
		cookie: null,
};

export default initialState;
