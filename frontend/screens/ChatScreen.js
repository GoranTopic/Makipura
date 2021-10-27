import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback } from 'react';
import ChatView from "../components/ChatView.js";

export default function ChatScreen({ socket, route, navigate }){

		const { contact } = route.params;
		
		return <View style={styles.container}>
				<StatusBar style="auto"/>
				<ChatView contact={contact} socket={socket}/>
		</View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

