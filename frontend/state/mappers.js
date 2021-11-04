import { 
		setSocket, 
		setUser, 
		setCookie, 
		setState, 
		setAppError, 
		setAppIsLoading } from './actions.js'


const mapStateToProps = state => {
    return {
        state: state,
    };
}

const mapDispatchToProps = dispatch => {
		return {
				setSocket: socket => {
						dispatch(setSocket(socket));
				},
				setUser: user => {
						dispatch(setUser(user));
				},
				setCookie: cookie => {
						dispatch(setCookie(cookie));
				},
				setState: state => {
						dispatch(setState(state));
				},
				setAppError: error  => {
						dispatch(setAppError(state));
				},
				setAppIsLoading: isLoading  => {
						dispatch(setAppIsLoading(isLoading));
				},
		}
}

  
export { mapStateToProps, mapDispatchToProps }
