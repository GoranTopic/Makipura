import { setSocket, setCookie, setState } from './actions.js'

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

        setCookie: cookie => {
            dispatch(setCookie(cookie));
        },

        setState: state => {
            dispatch(setState(state));
        },
    }
}

  
export { mapStateToProps, mapDispatchToProps }
