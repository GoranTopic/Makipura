import React, { useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import { MessageBox } from 'react-chat-elements';


const Chat = () => {
		const [targetOnline, setTargetOnline] = useState(false);

		return (
				<View style={styles.container}>
						<Text>Open up App.js to start working on your app!</Text>
				</View>
		);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatView;
