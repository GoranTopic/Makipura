/* a button that when pressed diplayes a loding animation */
import { View, Button, Text } from 'react-native';
import React, { useState } from 'react';
import { DotsLoader, } from 'react-native-indicator';

export default function LoadingButton(props){
		const [loading, setLoading] = useState(false);
		const { title, onPress, loader } = props;
		
		const handlePress = async () => {
				setLoading(true);
				await onPress()
						.then(setLoading(true));
		}
		
		return(
				<View> 
						{ loading?
								<DotsLoader size={20}
										betweenSpace={7} /> :
								<Button title={title}
										onPress={handlePress}/> } 
				</View> 
		);

}
				
