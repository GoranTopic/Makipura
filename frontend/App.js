import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import io from "socket.io-client/dist/socket.io"; 
// import this way to get around dependencies with react antive
import ChatListScreen from './screens/ChatListScreen.js';
import ChatScreen from './screens/ChatScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import SignupScreen from './screens/SignupScreen.js';
import NotificationsScreen from './screens/NotificationsScreen.js';
// import react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppNavigator from './navigation/AppNavigator.js';
// import reducer
import { Provider } from 'react-redux';
import store from './state/store.js';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {

		/*
		const [socket, setSocket] = useState( io(
				"http://10.0.0.3:3000", 
				//'http://192.168.1.219:3000',
				{ jsonp: false }
		));

		useEffect(() => { 
				socket.onAny((event) => {
						console.log(`ANY ${event}`);
				});
				socket.on("connect_error", () => {  
						//console.log("connection error");
						setTimeout(() => {    
								socket.connect();  
						}, 1000);});
				socket.on("disconnect", (reason) => {
						console.log("disconected");
				});
		} , [])



		const ContactStack = () => <>
				<Stack.Navigator initialRouteName="ContactsList">
						<Stack.Screen
								options={{ headerShown: false }}
								name="ContactsList">  
								{ props => <ContactListScreen {...props} socket={socket} /> }
						</Stack.Screen>
						<Stack.Screen 
								options={{ headerShown: false }}
								name="Chat"
								//options={({ route }) => ({ title: route.params.contact.userID })} 
						>  
								{ props => <ChatScreen {...props} socket={socket} /> }
						</Stack.Screen>
				</Stack.Navigator>
		</>


		const loggedInTabs = () => <>
				<Tab.Navigator>
						<Tab.Screen 
								options={{ headerShown: false }}
								name="Home">  
								{ props => <HomeScreen {...props} /> }
						</Tab.Screen>
						<Tab.Screen
								name="Contacts"
								options={{ headerShown: false }}
								component={ContactStack}/>  
				</Tab.Navigator>
		</>

				// render this stack if user is logged In
				const loggedInStack = () => {  
						const initial_context = { signedIn: false, cookie: "cookie" };
						return <>
								<Context.Provider context={initial_context}>
										<Stack.Navigator>
												<Stack.Screen name="LoggedInTabs"
														component={loggedInTabs}
														options={{ headerShown: false }} />  
										</Stack.Navigator>  
								</Context.Provider>
						</>
				}


		const authStack = () =>  <>
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

				const signupTabs = <>
						<Tab.Navigator initialRouteName="Home" >
								<Tab.Screen 
										name="AuthStack"
										component={authStack}
										options={{ headerShown: false }} />  
								<Tab.Screen name="Home" 
										options={{ headerShown: false }} >  
										{ props => <HomeScreen {...props} /> }
								</Tab.Screen>
						</Tab.Navigator>
				</>

		const loggedInDrawer = <Drawer.Navigator initialRouteName="loggedInStack">
				<Drawer.Screen 
						name="loggedInStack" 
						component={loggedInStack} />
				<Drawer.Screen name="Notifications" component={NotificationsScreen} />
		</Drawer.Navigator>
		*/

				return (
						<Provider store={store}>
								<AppNavigator/>
						</Provider>
				);
}

