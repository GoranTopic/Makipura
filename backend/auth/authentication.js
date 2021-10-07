import postModel from "../posts/models.js";

const isAuthenticated = (req, res, next) => { 
		/* throws an error if it gets an reques from an  non-authenticated user */
		if(!req.isAuthenticated())
				// if there is a request and user is not authenticated, return error message
				res.status(401).json({ status: 'faliure', msg: "user is not logged in"});
		else next(); // let it pass
}

const isNotAuthenticated = (req, res, next) => { 
		/* throws an error if it gets an reques from an authenticated user */
		if(req.isAuthenticated())
				// if there is a request and the user is authenticated, returns error message
				res.status(401).json({ status: 'faliure', msg: "already logged in"});
		else next(); // let it pass
}


export { isAuthenticated, isNotAuthenticated } 
