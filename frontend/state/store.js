import thunk from 'redux-thunk';
import stateReducer from './stateReducer.js';
import { applyMiddleware, createStore, combineReducers } from 'redux';

const reducer = combineReducers({
		 stateReducer: stateReducer
});

export default createStore(reducer,applyMiddleware(thunk));
