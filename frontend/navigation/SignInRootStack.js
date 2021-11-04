// import react navigation
import React  from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen.js';
import AboutScreen from '../screens/AboutScreen.js';
import SignupScreen from '../screens/SignupScreen.js';
import LoginScreen from '../screens/LoginScreen.js';

const Tab = createMaterialTopTabNavigator();

const BottomTabs = () => (
		<>
				<Tab.Navigator tabBarPosition="bottom"
						initialRouteName="Login">
						<Tab.Screen 
								name="Login"
								options={{ headerShown: false }} >
								{ props => <LoginScreen {...props} /> }
						</Tab.Screen>
						<Tab.Screen 
								name="Home"
								//component={HomeScreen}/>  
								options={{ headerShown: false }}>
								{ props => <HomeScreen {...props} /> }
						</Tab.Screen>
				</Tab.Navigator>
		</>
)

const Drawer = createDrawerNavigator();

const UserDrawer = () => (
		<>
				<Drawer.Navigator 
						initialRouteName="UserHome">
						<Drawer.Screen 
								name="BottomTabs" 
								component={BottomTabs} 
								options={{ title: 'Makipura' }}
						/>
						<Drawer.Screen 
								name="About" 
								component={AboutScreen}
								options={{ title: 'Makipura', 
										drawerLabel: 'About',
								}}
						/>
				</Drawer.Navigator>
		</>
)


const Stack = createNativeStackNavigator();

const SignInRootStack = () => (
		<>
				<Stack.Navigator initialRouteName="Drawer">
						<Stack.Screen 
								name="Drawer"
								options={{ headerShown: false }} 
								component={UserDrawer}
						/>
						<Stack.Screen 
								name="Login"
								options={{ headerShown: true }} >
								{ props => <LoginScreen {...props} /> }
						</Stack.Screen>
						<Stack.Screen 
								name="Signup"
								options={{ headerShown: true }} >
								{ props => <SignupScreen {...props} /> }
						</Stack.Screen>
				</Stack.Navigator>  

		</>
)

export default SignInRootStack;
