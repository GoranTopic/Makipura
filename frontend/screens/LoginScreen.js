import { StyleSheet, Text,  View, TouchableOpacity, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback } from 'react';
import { signin } from '../queries/auth.js'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../state/mappers.js';
import Divider from 'react-native-divider';
import { successToast, errorToast } from '../components/Toaster.js';
import Toast from 'react-native-toast-message';
import LoadingButton from '../components/buttons/LoadingButton.js'
import ValidatingTextInput from '../components/text-inputs/ValidatingTextInput.js'
import PasswordTextInput from '../components/text-inputs/PasswordTextInput.js';
import Button from '../components/buttons/button.js';
import colors from '../config/colors.js';
//import { GoogleSignin, GoogleSigninButton, statusCodes, } from 'react-native-google-signin';


const LoginScreen = ({ setUser, navigation }) => {
		const [username, onChangeUsername] = useState("");
		const [password, onChangePassword] = useState("");

		const handleSignin = async () => {  
				await signin({ 
						username: username,
						password: password,
				}).then(result => {
						successToast({ text1: `Logined is as ${username}` });
						setUser({
								username: username, 
								cookie: result.cookie,
						});
				}).catch( err => {
						console.log(err);
						if(err.response)
								errorToast({ text1: err.response.data });
						else if(err.message)
								errorToast({ text1: err.message });
				} )
		}

		return <View style={styles.container}>
				<StatusBar style="auto"/>
				<SafeAreaView>
						<Text>Login</Text>
						<ValidatingTextInput
								styleTextInput={styles.inputFontSize}
								styleContainer={styles.input}
								onChangeText={onChangeUsername}
								validate={false}
								placeholder="username"
								autoCapitalize="none"
								value={username}
						/>
						<PasswordTextInput 
								styleTextInput={styles.inputFontSize}
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
				//flex: 1,
				backgroundColor: '#fff',
				alignItems: 'center',
				justifyContent: 'center',
		},
		input: {
				height: 40,
				width:  200,
				margin: 12,
				borderRadius: 10,
				borderWidth: 1,
				padding: 10,
				shadowOpacity: 100,
				shadowRadius: 2,
				shadowOffset: {
              width: 200,
              height: -9,
            },
		},
		inputFontSize: {
				fontSize: 16,
		}
});

