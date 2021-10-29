import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'

export default function ChatView({ socket, contact }){
		const [messages, setMessages] = useState([]);
		
		useEffect(() => {
				socket.emit("load-messages");
				socket.on("load-messages", messages => {
						console.log('loaded msessages');
						setMessages(previousMessages => 
								GiftedChat.append(previousMessages, messages))
				});
				socket.on("message", message => {
						console.log('recived message');
						setMessages(previousMessages => 
								GiftedChat.append(previousMessages, message))
				});
				return 
		}, []);

		const onSend = useCallback((messages = []) => {
				console.log("sending message to:" + contact.userID);
				messages.forEach(message => { message.to = contact });
				socket.emit('message', messages);
				setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
		}, [])

		return (
				<GiftedChat
						messages={messages}
						onSend={message => onSend(message)}
						user={{
								_id: socket.id,
						}}
				/>
		)
}

