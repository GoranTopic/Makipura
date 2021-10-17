import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';


const Message = () => {
		const [ fromSelf, setFromSelf ] = useState(false);

		return (
			
				<View style={styles.container}>
						<Text>Open up App.js to start working on your app!</Text>
						<Chat/>
						<OnlineUsers/>
						<StatusBar style="auto" />
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

export { Chat, OnlineUsers  };
