import initUser from '../inicializers/initUser.js';

const userReducer = (state = initUser, action) => {
		switch (action.type) {
				case 'SET_USER':
						console.log("got in the reducer payload: ");
						console.log(action.payload);
						state.isSignIn = true;
						state.cookie = action.payload.cookie;
						state.username = action.payload.username;
						return  state
				case 'SET_STATE':
						state.stateReducer = action.payload;
						return  state;
				case 'SET_SOCKET':
						state.stateReducer.socket = action.payload;
						return state;
						//return { ...state, socket: action.payload } //is this right?
				case 'SET_COOKIE':
						state.stateReducer.cookie = action.payload;
						return state;
				default:
						return state;
		}
};

export default userReducer;
