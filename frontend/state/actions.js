export const setSocket = store => ({
		type: 'SET_STORE',
		action: { payload: store },
});

export const setUser = user => ({
		type: 'SET_USER',
		action: { payload: user },
})

export const setCookie = cookie => ({
		type: 'SET_COOKIE',
		action: { payload: cookie },
});

export const setState = state => ({
		type: 'SET_STATE',
		action: { payload: state },
});

export const setAppError = isError => ({
		type: 'SET_IS_ERROR',
		action: { payload: isError },
});

export const setAppIsLoading = isLoading => ({
		type: 'SET_IS_LOADING',
		action: { payload: isLoading },
});
