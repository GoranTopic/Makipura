export const setSocket = store => ({
		type: 'SET_STORE',
		payload: store,
});

export const setUser = user => ({
		type: 'SET_USER',
		payload: user,
})

export const setCookie = cookie => ({
		type: 'SET_COOKIE',
		payload: cookie,
});

export const setState = state => ({
		type: 'SET_STATE',
		payload: state,
});

export const setAppError = isError => ({
		type: 'SET_IS_ERROR',
		payload: isError,
});

export const setAppIsLoading = isLoading => ({
		type: 'SET_IS_LOADING',
		payload: isLoading,
});
