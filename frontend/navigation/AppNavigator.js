import React  from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message'
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../state/mappers.js'
import LoggedInRootStack from './LoggedInRootStack.js';
import SignInRootStack from './SignInRootStack.js';

const AppNavigator = props =>  {  	
		//console.log("getting props state from AppNavigator: ");
		//console.log(props);
		const { user } = props.state;
		return <>
				<NavigationContainer>     
						{ //props.state.isLoggedIn? 
								user.isSignedIn?
								<LoggedInRootStack/> :
								<SignInRootStack/> }
						<Toast ref={(ref) => Toast.setRef(ref)} />
				</NavigationContainer>
		</>
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);



