import React  from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message'
import { toastConfig } from '../components/Toaster.js';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../state/mappers.js'
import LoggedInRootStack from './LoggedInRootStack.js';
import SignInRootStack from './SignInRootStack.js';

const AppNavigator = ({ state }) =>  {  	
		const { isSignedIn }  = state.user; // get state of user
		return <>
				<NavigationContainer>     
						{ isSignedIn?
								<LoggedInRootStack/> : // render if user is logged in
								<SignInRootStack/>  // render is not logged in
						}
						<Toast config={toastConfig}
								ref={ ref => Toast.setRef(ref)} />
				</NavigationContainer>
		</>
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);



