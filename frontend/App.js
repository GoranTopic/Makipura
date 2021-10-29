import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback } from 'react';
import io from "socket.io-client/dist/socket.io"; 
// import this way to get around dependencies with react antive
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppNavigator from './navigation/AppNavigator.js';
// import reducer
import { Provider } from 'react-redux';
import store from './state/store.js';

export default function App() {

		const [socket, setSocket] = useState( 
				io(
						//"http://10.0.0.3:3000", 
						'http://192.168.1.219:3000',
						{ jsonp: false }
				)
		);
		//console.log("printing from App:");
		//console.log(store)

		/*
		if(socket){
				console.log("got socket:");
				console.log(socket);
				props.setSocket(socket);
				console.log("dispatched socket");
		}

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
		*/

		return <>
				<Provider store={store}>
						<AppNavigator/>
				</Provider>
		</>
}

