import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const Eye = <FontAwesomeIcon className="icon" icon={faEye} />;
const EyeSlash = <FontAwesomeIcon className="icon" icon ={faEyeSlash}/>;

export default function PasswordTextInput(props){
		const [showPass, setShowPass] = useState(false);
		const toogleShowpass = () => setShowPass(!showPass);

		const { 
				styleTextInput = {}, 
				styleContainer = {},
				styleIcon = {},
		} = props; 

		const containerStyles = [ styles.container,  styleContainer ];
		const textInputStyles = [ styles.textInput,  styleTextInput ];
		const iconStyles = [ styles.icon,  styleIcon ];


		return(  
				<View style={containerStyles}>
						<TextInput
								{...props}
								style={textInputStyles}
								secureTextEntry={!showPass}
								placeholder="password"
						/>
						<TouchableOpacity onPress={toogleShowpass}>
								<FontAwesomeIcon 
										style={iconStyles}
										className="icon"
										icon ={ showPass? faEye : faEyeSlash }/>
						</TouchableOpacity> 
				</View>
		);
}

const styles = StyleSheet.create({
		container: {
				flexDirection:'row',
				justifyContent: 'space-between',
		},
		textInput: {
		},
		icon:{
		},
});

