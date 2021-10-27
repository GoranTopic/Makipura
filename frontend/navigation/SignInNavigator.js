// import react navigation
import React  from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AuthNavigator from './AuthNavigator.js';
import HomeScreen from '../screens/HomeScreen.js';

const Tab = createBottomTabNavigator();

const SignInNavigator = props => {


		const signupTabs = <>
				<Tab.Navigator initialRouteName="Home" >
						<Tab.Screen 
								name="AuthStack"
								component={AuthNavigator}
								options={{ headerShown: false }} />  
						<Tab.Screen name="Home" 
								options={{ headerShown: false }} >  
								{ props => <HomeScreen {...props} /> }
						</Tab.Screen>
				</Tab.Navigator>
		</>

				return signupTabs;
}

export default SignInNavigator;






