import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen.js';
import ChatNavigator from './ChatNavigator.js';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const HomeNavigator = props => {
		/* this stack dislays the home for a logged in user */

		const HomeTabs = () => <Tab.Navigator>
				<Tab.Screen 
						name="Home"
						//component={HomeScreen}/>  
						options={{ headerShown: false }}>
						{ props => <HomeScreen {...props} /> }
				</Tab.Screen>
				<Tab.Screen
						name="Contacts"
						options={{ headerShown: false }}
						component={ChatNavigator}/>  
		</Tab.Navigator>
				
				// render this stack if user is logged In
				const HomeStack = <>
						<Stack.Navigator>
								<Stack.Screen name="HomeTabs"
										component={HomeTabs}
										options={{ headerShown: false }} />  
						</Stack.Navigator>  
				</>

				return HomeStack;
}

export default HomeNavigator;
