import { token_length } from './config.js';

// match hex number of the length of the token
let code_regex = new RegExp('^[0-9a-fA-F]{' + token_length + '}$');

const validateToken = (req, res, next) => {
		/* validate the passed token to see it ti is a valid uuid */
		let token = req.params.token;
		if(token.match(code_regex)) next(); // it matched
		else res.status(401).json({ 
				status: "failure", 
				msg: "invalid validation token",
		});
}


export { validateToken }

