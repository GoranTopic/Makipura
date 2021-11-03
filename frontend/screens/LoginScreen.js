import { StyleSheet, Text,  View, TouchableOpacity, Button, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback } from 'react';
import { signin } from '../queries/auth.js'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Eye = <FontAwesomeIcon className="icon" icon={faEye} />;
const EyeSlash = <FontAwesomeIcon className="icon" icon ={faEyeSlash}/>;

export default function LoginScreen({ socket, route, navigation }){
		const [username, onChangeUsername] = useState("");
		const [password, onChangePassword] = useState("");
		const [showPass, setShowPass] = useState(false);
		const [error, setError] = useState({ value: false, msg: '' });
		console.log("showPass");
		console.log(showPass);
		const toogleShowpass = () =>{
				console.log("this ran");
				console.log(showPass);
				setShowPass(!showPass);
		}
						
		return <View style={styles.container}>
				<StatusBar style="auto"/>
				<SafeAreaView>
						<Text>Login Screen</Text>
						<TextInput
								style={styles.input}
								onChangeText={onChangeUsername}
								placeholder="username"
								value={username}
						/>
						<View style={styles.input}>
								<TextInput
										onChangeText={onChangePassword}
										value={password}
										secureTextEntry={showPass}
										placeholder="password" />
								{showPass ?
										<TouchableOpacity onPress={toogleShowpass}>
												<FontAwesomeIcon className="icon" icon={faEye} />
										</TouchableOpacity> :
										<TouchableOpacity onPress={toogleShowpass}>
												<FontAwesomeIcon className="icon" icon ={faEyeSlash}/>
										</TouchableOpacity>}
						</View>
						<Button 
								title="Login"
								onPress={()=>{}}
						/>
						<Button 
								title="signup"
								onPress={()=>{ navigation.navigate('Signup') }}
						/>
				</SafeAreaView>
		</View>
}

const styles = StyleSheet.create({
		container: {
				flex: 1,
				backgroundColor: '#fff',
				alignItems: 'center',
				justifyContent: 'center',
		},
		input: {
				height: 40,
				width: 145,
				margin: 12,
				flexDirection: "row",
				borderRadius: 10,
				justifyContent: "space-between",
				borderWidth: 1,
				padding: 10,
		},
});

