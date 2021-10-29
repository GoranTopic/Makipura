import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import io from "socket.io-client/dist/socket.io"; 
import { mapStateToProps, mapDispatchToProps } from '../state/mappers.js';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeBottomTabs from './HomeBottomTabs.js'
import NotificationsScreen from '../screens/NotificationsScreen.js';
import ChatScreen from '../screens/ChatScreen.js';
import ProfileScreen from '../screens/ProfileScreen.js';
import SettingsScreen from '../screens/SettingScreen.js';

const Drawer = createDrawerNavigator();

const UserDrawer = () => (
		<>
				<Drawer.Navigator 
						initialRouteName="UserHome">
						<Drawer.Screen 
								name="HomeTabs" 
								component={HomeBottomTabs} 
								options={{ title: 'Makipura' }}
						/>
						<Drawer.Screen 
								name="Notifications" 
								component={NotificationsScreen}
						/>
						<Drawer.Screen 
								name="Settings" 
								component={SettingsScreen}
						/>
						<Drawer.Screen 
								name="Profile" 
								component={ProfileScreen}
						/>
				</Drawer.Navigator>
		</>
)

 
export default connect(mapStateToProps, mapDispatchToProps)(UserDrawer);

