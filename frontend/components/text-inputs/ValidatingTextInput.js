import React, { useEffect, useState, useCallbac } from 'react';
import { StyleSheet, Text,  View, } from 'react-native';
import TextInput from './TextInput.js';
import validator from 'validator';

export default function ValidatingTextInput(props){
		const [errorText, setErrorText] = useState('');
		const [ validators, setValidators ] = useState([]);
		
		const { value, 
				onChangeText, 
				error = "invalid",
				setError = false,
				validate = true,
				styleTextInput = {}, 
				styleContainer = {},
				styleErrorText = {},
		} = props; 
		// intesect 

		const getValidators = () => 
				Object.keys(props)
						.filter( prop => validator[prop])
						.map( prop => ({ 
								validate: validator[prop], 
								params: typeof props[prop] === "boolean" ?  
								{} : props[prop],
						}));

		useEffect(() => { // get validatos from props
				setValidators( getValidators());
				if(setError) setErrorText(setError);
		}, []);
		

		const onChange = text => {
				onChangeText(text);
				if(validate)
						validators.forEach( validator => {
								console.log(validator);
								if(!validator.validate(text, validator.params)) 
										setErrorText(error);
								else setErrorText('');
								console.log(error);
						});
		};

		const containerStyles = [ styles.container,  styleContainer ];
		const textInputStyles = [ styles.textInput,  styleTextInput ];
		const errorTextStyles = [ styles.errorText,  styleErrorText ];

		return(  
				<View style={containerStyles}>
						<TextInput 
								style={textInputStyles}
								{...props}
								onChangeText={onChange}
						/>
						{ errorText !== '' ?  
								<Text style={errorTextStyles}> 
										* {errorText} 
								</Text> :  
										<></> 
						}
				</View>
		);
}

const styles = StyleSheet.create({
		container: {
				flexDirection:'column',
				justifyContent: 'center',
		},
		textInput: {
		},
		errorText:{
				color: 'red',
				fontStyle: 'italic',
				fontSize: 12, 
				fontWeight: '900',
				textAlign: 'left',
		},
});

