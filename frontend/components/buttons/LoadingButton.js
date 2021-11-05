/* a button that when pressed diplayes a loding animation */
import { StyleSheet, View, Pressable, Text } from 'react-native';
import React, { useState } from 'react';
import Button from './button.js';
import { DotsLoader } from 'react-native-indicator';
import colors from '../../config/colors.js';

export default function LoadingButton(props){
		const [loading, setLoading] = useState(false);
		const { 
				title = "button",
				onPress,
				Loader = DotsLoader,
				styleButton = {},
				styleText = {},
				styleLoader = {},
		} = props;
		
		const handlePress = async () => {
				setLoading(true);
				await onPress()
						.then(setLoading(false));
		}
		
		return(
				<View style={styles.container}>  
						{ loading?
								<Loader color={colors.btnGreen}
										size={16}
										betweenSpace={7}
										{...props} /> :
								<Button 
										styleText={styleText}
										styleButton={styleButton} 
										title={title}
										onPress={handlePress} 
										{...props} /> 
						} 
				</View> 
		);

}

const styles = StyleSheet.create({
		container: {
				backgroundColor: '#fff',
				alignItems: 'center',
				justifyContent: 'center',
		},
});
	
