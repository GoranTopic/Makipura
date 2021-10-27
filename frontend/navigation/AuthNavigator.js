import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen.js';
import SignupScreen from '../screens/SignupScreen.js';

const Stack = createNativeStackNavigator();

const AuthNavigator = props => {  

		return <>
				<Stack.Navigator initialRouteName="Login">
						<Stack.Screen 
								name="Login"
								options={{ headerShown: false }} >
								{ props => <LoginScreen {...props} /> }
						</Stack.Screen>
						<Stack.Screen 
								name="Signup"
								options={{ headerShown: false }} >
								{ props => <SignupScreen {...props} /> }
						</Stack.Screen>
				</Stack.Navigator>  
		</>
}

export default AuthNavigator;
