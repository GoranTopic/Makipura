import initialState from './initialState.js';

const userReducer = (state = initialState, action) => {
		switch (action.type) {
				case 'LOGIN_USER':
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
