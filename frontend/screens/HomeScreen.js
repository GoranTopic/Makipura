import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Context from '../state/context.js';
import React, { useEffect, useState, useCallback } from 'react';

export default function HomeScreen({ socket, route, navigate }){
		const context = React.useContext(Context)
		console.log("context from HomeScreen:")
		console.log(context);
		console.log("adde change");
		
		return <>
				<View style={styles.container}>
						<StatusBar style="auto"/>
						<Text>Home Screen</Text>
				</View>
		</>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

