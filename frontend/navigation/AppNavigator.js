import React  from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../state/mappers.js'
import LoggedInNavigator from './LoggedInNavigator';
import SignInNavigator from './SignInNavigator';

const AppNavigator = props =>  {  	
		console.log("getting props state from AppNavigator: ");
		console.log(props);
		return <>
				<NavigationContainer>     
						{ //props.state.isLoggedIn? 
								true?
								<LoggedInNavigator/> :
								<SignInNavigator/> }
				</NavigationContainer>
		</>

}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);



