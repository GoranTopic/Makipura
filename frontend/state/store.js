import thunk from 'redux-thunk';
import userReducer from './userReducer.js';
import { applyMiddleware, createStore, combineReducers } from 'redux';

const reducer = combineReducers({
		 user: userReducer
});

export default createStore(reducer,applyMiddleware(thunk));
