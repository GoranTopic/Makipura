import React from 'react';
import AppNavigator from './navigation/AppNavigator.js';
import { Provider } from 'react-redux'; // import reducer
import { store, persistor } from './state/store.js'; 
// call inizilizer to produce a state
import { PersistGate } from 'redux-persist/integration/react';
import dotenv from "dotenv";

export default function App() {
		dotenv.config()
		console.log('BASE_API:');
		console.log(process.env.BASE_API);

		return <>
				<Provider store={store}>
						<PersistGate loading={null} persistor={persistor}>
								<AppNavigator/>
						</PersistGate>
				</Provider>
		</>
}

