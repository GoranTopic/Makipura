import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback } from 'react';

const RenderContact = ({ contact, navigation }) => 
		<TouchableOpacity
				onPress={ () => navigation.navigate('Chat', { contact }) }>
				<Text>{contact.userID}</Text>
		</TouchableOpacity>


function ChatListScreen({ socket, navigation }){  
		const [ contacts, setContacts ] = useState([]);

		useEffect(() => { // query users
				socket.emit("get users");
				socket.on("users", users => {
						//console.log(users);
						setContacts(users);
				});
				socket.on('new user', user => 
						setContacts(previousContacts => [ ...previousContacts, user ])
				)

		}, []);

		return <View style={styles.container}>
				<StatusBar style="auto" />
				<Text>User: {socket.id}</Text>
				<Text>Contacts List screen</Text>
				{ contacts.map( (contact, index) => 
				<RenderContact 
						key={contact.userID}
						navigation={navigation}
						contact={contact}  />
				) }
		</View>
}

export default ChatListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
  },
});
