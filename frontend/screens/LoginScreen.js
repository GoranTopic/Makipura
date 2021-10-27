import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback } from 'react';

export default function LoginScreen({ socket, route, navigation }){
		
		return <View style={styles.container}>
				<StatusBar style="auto"/>
				<Text>Login Screen</Text>
				<Button 
						title="signup"
						onPress={()=>{ navigation.navigate('Signup') }}
				/>
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

