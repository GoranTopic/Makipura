// import post ot be able to query request
/* this method query the databse for the resourse in question
 * it stores it in que req object to be user by other middleware 
 * down the line: req.resource = query
 * this is so that we don't have to query the database twice */
import userModel from "../models/userModel.js";
import tokenModel from "./models.js";

const queryUserByToken = (req, res, next)  =>{
		/* with a given token, in req.token 
		 * return the user in the req as req.token_user  */
		let id = req.token.userid; // get user id from logged in user
		userModel.findById(id, (error, user)=> {
				if(error) res.status(500).json({ error });
				else if(!user) res.status(404).json({status: "failure", msg: "user not found with token"});
				else{
						req.token_user = user; 
						next();
				} 
		});
}

const queryUserByEmail = (req, res, next) => {
		/* with a given email, in req.email 
		 * return the user in the req as req.user  */
		let email = req.token.email; 
		userModel.findOne({ email }, (error, user)=> {
				if(error) res.status(500).json({ error });
				else if(!user) res.status(404).json({
						status: "failure", 
						msg: "user not found with given email"
				});
				else{
						req.user = user; 
						next();
				} 
		});
}

export { queryUserByToken, queryUserByEmail }

