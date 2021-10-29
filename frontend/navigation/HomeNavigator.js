import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen.js';
import ChatNavigator from './ChatNavigator.js';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// render this stack if user is logged In
const HomeStack = () => <>
		<Stack.Navigator>
				<Stack.Screen name="HomeScreen"
						component={HomeScreen}
						options={{ headerShown: false }} />  
		</Stack.Navigator>  
</>



const HomeNavigator = props => {
		/* this stack dislays the home for a logged in user */



		const HomeTabs = <>
				<Tab.Navigator>
						<Tab.Screen 
								name="HomeStack"
								//component={HomeScreen}/>  
								options={{ headerShown: false }}>
								{ props => <HomeStack {...props} /> }
						</Tab.Screen>
						<Tab.Screen
								name="Contacts"
								options={{ headerShown: false }} >
								{ props => <ChatNavigator {...props} /> }
						</Tab.Screen>
				</Tab.Navigator>
		</>
				
				return HomeTabs;
}

export default HomeNavigator;
