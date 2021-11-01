import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../state/mappers.js';
import HomeScreen from '../screens/HomeScreen.js';
import ChatListScreen from '../screens/ChatListScreen';

const Tab = createMaterialTopTabNavigator();

const HomeBottomTabs = props => {
		/* this stack dislays the home for a logged in user */
		const { user } = props.state;
		//console.log(props);
		return <>
				<Tab.Navigator tabBarPosition="bottom">
						<Tab.Screen 
								name="Home"
								//component={HomeScreen}/>  
								options={{ headerShown: false }}>
								{ props => <HomeScreen {...props} /> }
						</Tab.Screen>
						<Tab.Screen
								name="ChatsList"
								options={{ headerShown: false }} >
								{ props => <ChatListScreen {...props} socket={user.socket} /> }
						</Tab.Screen>
				</Tab.Navigator>
		</>
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeBottomTabs);
