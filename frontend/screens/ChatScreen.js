import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../state/mappers.js';
import React, { useEffect, useState, useCallback } from 'react';
import ChatView from "../components/ChatView.js";

function ChatScreen({ state, route, navigate }){
		const { contact } = route.params;
		const { socket, cookie }  = state.user;
		
		return <View style={styles.container}>
				<StatusBar style="auto"/>
				<ChatView contact={contact} socket={socket}/>
		</View>
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

