import initialState from './initialState.js';

const stateReducer = (state = initialState, action) => {
		switch (action.type) {
				case 'LOGIN_USER':
						return  state
				case 'SET_SOCKET':
						return { ...state, socket: action.payload } //is this right?
				default:
						return state;
		}
};

export default stateReducer;
