import userModel from "../models/userModel.js";
import tokenModel  from "./models.js"

const hasEmail = (req, res, next) => {
		/* from a given user, in req, checks if the user has a email field*/ 
		let user = req.user;
		if(user.email) next(); // let the user pass
		else res.status(401).json({
				status: "failure", 
				msg: "user does not hae a email."
		});
}

const doesTokenExists = (req, res, next) => {
		/* check is a token is in the db token collection*/
		let token = req.params.token; // get token
		tokenModel.exists({ token }, 
				(error, result) => {  
						if(error) res.status(500).json({
								status: "failure", 
								msg: error,
						})
						else{  
								if(result){ // if token found in db, add to req 
										req.token = token;
										next();
								}else res.status(404).json({ error: "not found" });
						}
				}
		);
}

export { hasEmail, doesTokenExists }

