import thunk from 'redux-thunk';
import userReducer from './userReducer.js';
import appReducer from './appReducer.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { applyMiddleware, createStore, combineReducers } from 'redux';

const persistConfig = {
		key: 'root',
		storage: AsyncStorage,
		whitelist: [],
};

const rootReducer = combineReducers({
		user: persistReducer(persistConfig, userReducer),
		app: appReducer // no need to 
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
