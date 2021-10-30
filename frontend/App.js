import React from 'react';
import AppNavigator from './navigation/AppNavigator.js';
import { Provider } from 'react-redux'; // import reducer
import store from './state/store.js'; // call inizilizer to produce a state

export default function App() {

		return <>
				<Provider store={store}>
						<AppNavigator/>
				</Provider>
		</>
}

