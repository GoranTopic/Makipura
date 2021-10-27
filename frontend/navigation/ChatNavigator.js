import React from 'react';
import { connect } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { mapStateToProps, mapDispatchToProps } from '../state/mappers.js';
import ChatListScreen from '../screens/ChatListScreen';
import ChatScreen from '../screens/ChatScreen.js';
import Context from '../state/context.js';

const Stack = createNativeStackNavigator();

const ChatNavigator = props => {

		const ChatStack = <>
				<Stack.Navigator 
						initialRouteName="ChatList">
						<Stack.Screen
								options={{ headerShown: false }}
								name="ChatList">  
								{ props => <ChatListScreen {...props} socket={socket} /> }
						</Stack.Screen>
						<Stack.Screen 
								name="Chat"
								//options={({ route }) => ({ title: route.params.contact.userID })} 
								options={{ headerShown: false }} >  
								{ props => <ChatScreen {...props} socket={socket} /> }
						</Stack.Screen>
				</Stack.Navigator>
		</>
		
				return ChatStack;
}

  
export default connect(mapStateToProps)(ChatNavigator);

