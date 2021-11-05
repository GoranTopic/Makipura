import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text,  View, TextInput } from 'react-native';
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const Eye = <FontAwesomeIcon className="icon" icon={faEye} />;
const EyeSlash = <FontAwesomeIcon className="icon" icon ={faEyeSlash}/>;

export default function PasswordTextinput(props){
		const [showPass, setShowPass] = useState(false);
		const toogleShowpass = () => setShowPass(!showPass);

		return(  
				<View style={styles.input}>
						<TextInput
								secureTextEntry={!showPass}
								placeholder="password" 
								{...props}/>
						<TouchableOpacity onPress={toogleShowpass}>
								<FontAwesomeIcon className="icon"
										icon ={ showPass? faEye : faEyeSlash }/>
						</TouchableOpacity> 
				</View>
		);
}

