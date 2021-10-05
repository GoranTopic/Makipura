import { validate } from 'uuid';

const validateToken = ( req, res, next ) => {
		/* validate the passed token to see it ti is a valid uuid */
		let token = req.params.token;
		return validate(token);
}


export { validateToken }

