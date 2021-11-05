import { StyleSheet, Text,  View, TouchableOpacity, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback } from 'react';
import { signin } from '../queries/auth.js'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../state/mappers.js';
import Divider from 'react-native-divider';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { DotsLoader, } from 'react-native-indicator';
import Toast from 'react-native-toast-message';
import LoadingButton from '../components/buttons/LoadingButton.js'
import ValidatingTextInput from '../components/text-inputs/ValidatingTextInput.js'
import PasswordTextInput from '../components/text-inputs/PasswordTextInput.js';
import Button from '../components/buttons/button.js';
import colors from '../config/colors.js';

const Eye = <FontAwesomeIcon className="icon" icon={faEye} />;
const EyeSlash = <FontAwesomeIcon className="icon" icon ={faEyeSlash}/>;

const LoginScreen = ({ setUser, navigation }) => {
		const [username, onChangeUsername] = useState("");
		const [password, onChangePassword] = useState("");
		const [showPass, setShowPass] = useState(false);
		const [loading, setLoading] = useState(false);

		const toogleShowpass = () => setShowPass(!showPass);

		const setToastError = ({text1, text2}) => 
				Toast.show({
						type: 'error',
						text1: text1,
						text2: text2,
						topOffset: 100,
				});

		const setToastSuccess = ({text1, text2}) => 
				Toast.show({
						type: 'success',
						text1: text1,
						text2: text2,
						topOffset: 100,
				});

		const handleSignin = async () => {  
				setLoading(true);
				await signin({ 
						username: username,
						password: password,
				}).then(result => {
						setLoading(false);
						setToastSuccess({ 
								text1: `Logined is as ${username}`
						});
						setUser({
								//username: result.config.data.username, 
								username: username, 
								cookie: result.cookie,
						});
				}).catch( err => {
						console.error(err);
						if(err.response)
								setToastError({ text1: err.response.data });
						else if(err.message)
								setToastError({ text1: err.message });
						setLoading(false);
				} )
		}

		return <View style={styles.container}>
				<StatusBar style="auto"/>
				<SafeAreaView>
						<Text>Login</Text>
						<ValidatingTextInput
								style={styles.input}
								onChangeText={onChangeUsername}
								validate={false}
								placeholder="username"
								autoCapitalize="none"
								value={username}
						/>
						<PasswordTextInput 
								styleContainer={styles.input}
								onChangeText={onChangePassword}
								value={password}/>
						<LoadingButton title="Login"
								onPress={handleSignin} />
						<Divider orientation={'center'}>with</Divider>
						<Divider orientation={'center'}>or</Divider>
						<Button onlyText={true}
								title="Create Account"
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
				justifyContent: "space-between",
				borderRadius: 10,
				borderWidth: 1,
				padding: 10,
		},
});

