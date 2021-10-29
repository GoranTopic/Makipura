export const setSocket = store => ({
		type: 'SET_STORE',
		action: { payload: store },
});

export const setCookie = cookie => ({
		type: 'SET_COOKIE',
		action: { payload: cookie },
});

export const setState = state => ({
		type: 'SET_STATE',
		action: { payload: state },
});
