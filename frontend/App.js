import React from 'react';
import AppNavigator from './navigation/AppNavigator.js';
import { Provider } from 'react-redux'; // import reducer
import { store, persistor } from './state/store.js'; 
// call inizilizer to produce a state
import { PersistGate } from 'redux-persist/integration/react';
import { BASE_API  } from '@env';

export default function App() {
		console.log('BASE_API:');
		console.log(BASE_API);

		return <>
				<Provider store={store}>
						<PersistGate loading={null} persistor={persistor}>
								<AppNavigator/>
						</PersistGate>
				</Provider>
		</>
}

