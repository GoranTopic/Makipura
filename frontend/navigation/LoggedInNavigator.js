import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import io from "socket.io-client/dist/socket.io"; 
import { createDrawerNavigator } from '@react-navigation/drawer';
import { mapStateToProps, mapDispatchToProps } from '../state/mappers.js';
import HomeNavigator from './HomeNavigator.js'
import NotificationsScreen from '../screens/NotificationsScreen.js';

const Drawer = createDrawerNavigator();

const LoggedInNavigator = props => {
		/* this navigator defines the routes for a logged in user, 
		 * it provide the user logged in context information */
		console.log("prining props from LoggedInNavigator:");
		console.log(props);
		
		const LoggedInDrawer = () => <>
						<Drawer.Navigator 
								initialRouteName="Home">
								<Drawer.Screen 
										name="Home" 
										component={HomeNavigator} />
								<Drawer.Screen 
										name="Notifications" 
										component={NotificationsScreen} />
						</Drawer.Navigator>
				</>

				return <LoggedInDrawer/>
}
 
export default connect(mapStateToProps, mapDispatchToProps)(LoggedInNavigator);

