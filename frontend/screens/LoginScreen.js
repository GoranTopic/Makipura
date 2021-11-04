import { StyleSheet, Text,  View, TouchableOpacity, Button, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback } from 'react';
import { signin } from '../queries/auth.js'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../state/mappers.js';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {  DotsLoader, } from 'react-native-indicator';
import Toast from 'react-native-toast-message';

const Eye = <FontAwesomeIcon className="icon" icon={faEye} />;
const EyeSlash = <FontAwesomeIcon className="icon" icon ={faEyeSlash}/>;

const LoginScreen = ({ setUser, navigation }) => {
		const [username, onChangeUsername] = useState("");
		const [password, onChangePassword] = useState("");
		const [showPass, setShowPass] = useState(false);
		const [error, setError] = useState(null);
		const [loading, setLoading] = useState(false);

		const toogleShowpass = () => setShowPass(!showPass);

		React.useEffect(() => {
				Toast.show({
						type: 'success',
						text1: 'Hello',
						text2: 'This is some something 👋'
				});
		}, []);

		const handleSignin = async () => {  
				setLoading(true);
				await signin({ 
						username: username,
						password: password,
				}).then(result => {
						if(result.suceess){
								setUser({
										username: username, 
										cookie: result.cookie
								});
								setLoading(false);
						}else { 
								setError(result.msg);
								setLoading(false);
						}
				}).then( result => {
						console.log("secone then ran with:");
						console.log(result)
						setLoading(false);
				}).catch( err => {
						console.log(err.message);
						console.log(err.name);
						if(err.name)
						setError(err.message)
						setLoading(false);
				} )
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
										secureTextEntry={!showPass}
										placeholder="password" />
								<TouchableOpacity onPress={toogleShowpass}>
										<FontAwesomeIcon className="icon"
												icon ={ showPass? faEye : faEyeSlash }/>
								</TouchableOpacity> 
						</View>
						{ loading?  
								<DotsLoader size={20}
										betweenSpace={7} />:
								<Button 
										title="Login"
										onPress={handleSignin}
								/>}
						{ error && 
								<Text stye={{ color: 'red' }}> 
										{error} 
								</Text>}
						<Button 
								title="signup"
								onPress={()=>{ navigation.navigate('Signup') }}
						/>
				</SafeAreaView>
		</View>
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
		container: {
				flex: 1,
				backgroundColor: '#fff',
				alignItems: 'center',
				justifyContent: 'center',
		},
		input: {
				height: 40,
				width: 140,
				margin: 12,
				flexDirection: "row",
				borderRadius: 10,
				justifyContent: "space-between",
				borderWidth: 1,
				padding: 10,
		},
});

