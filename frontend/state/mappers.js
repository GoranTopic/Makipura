const mapStateToProps = state => {
    return {
        state: state,
    };
}

const mapDispatchToProps = dispatch => {
	return{
        increaseTheValue : () => {
            //dispatch(increase());
						return null
        },

        decreaseTheValue : () => {
            //dispatch(decrease());
						return null
        }
    }
}
  
export { mapStateToProps, mapDispatchToProps }
