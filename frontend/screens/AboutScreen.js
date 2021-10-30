import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../state/mappers.js';

function AboutScreen({ state, navigation }) {
		const { isSingedIn }  = state.user;
		return (
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<Text> The Makipura is a plataform of Ethic indigenous e-commerce</Text>
						<Button onPress={() => navigation.goBack()} title="Go back home" />
						{ isSingedIn? <></> : <>
								<Button 
										title="Signup"
										onPress={()=>{ navigation.navigate('Signup') }}
								/>
								<Button 
										title="login"
										onPress={()=>{ navigation.navigate('Login') }}
								/>
						</> }
				</View>
		);
}


export default connect(mapStateToProps)(AboutScreen);
