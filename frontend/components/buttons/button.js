import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity  } from 'react-native';
import colors from '../../config/colors.js'

export default function Button(props) {
		const { 
				onPress, 
				title = 'button', 
				styleButton = {}, 
				styleText = {},
				onlyText,
		} = props;

		let btnStyles = [ 
				styles.button,  
				onlyText? styles.tranparentBtn : {} ,
				styleButton
		];

		let textStyles = [ 
				styles.text, 
				onlyText? styles.onlyText : {},
				styleText,
		];

		return (
				<TouchableOpacity style={btnStyles} onPress={onPress}>
						<Text style={textStyles}>{title}</Text>
				</TouchableOpacity>
		);
}

const styles = StyleSheet.create({
		button: {
				alignItems: 'center',
				justifyContent: 'center',
				paddingVertical: 10,
				paddingHorizontal: 30,
				borderRadius: 8,
				elevation: 5,
				borderWidth: 1,
				borderColor: colors.btnBorder,
				backgroundColor: colors.btnGreen,
		},
		text: {
				fontSize: 16,
				lineHeight: 21,
				fontWeight: 'normal',
				letterSpacing: 0.25,
				color: 'white',
		},
		onlyText: {
				color: colors.btnGreen,
				fontSize: 14,
		},
		tranparentBtn:{
				elevation: 0,
				borderWidth: 0,
				borderColor:  'transparent',
				backgroundColor: 'transparent',
				justifyContent: "space-between",
		}
});

