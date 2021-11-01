import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import io from "socket.io-client/dist/socket.io"; 
import { mapStateToProps, mapDispatchToProps } from '../state/mappers.js';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserDrawer from './UserDrawer.js';
import ChatScreen from '../screens/ChatScreen.js';

const Stack = createNativeStackNavigator();

// render this stack if user is logged In
/* this navigator defines the routes for a logged in user, 
 * it provide the user logged in context information */
const RootStack = props => (
		<>
				<Stack.Navigator>
						<Stack.Screen name="UserDrawer"
								component={UserDrawer}
								options={{ headerShown: false }} />  
						<Stack.Screen name="ChatScreen"
								component={ChatScreen}
								//options={({ route }) => ({ 
								//title: route.params.contact.userID 
								//})} 
								options={{ headerShown: true }} /> 
				</Stack.Navigator>  
		</>
)
 
export default connect(mapStateToProps, mapDispatchToProps)(RootStack);

