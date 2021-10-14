/* this method query the databse for the user in question
 * it stores it in que req object to be user by other middleware 
 * down the line: req.resource = user
 * it also saves the type of the resource as: req.resourceType
 * I Use the resorse as oppoused to usin user because passport.js
 * save the logged in user in req.user, and there is often 
 * the need to compare the two of them.
 * this is so that we don't have to query the database twice */
import userModel from './models.js';


const queryUserByUsername = (req, res, next) => {
		/* given an username, takes a user from the db
		 * and store it in req, as req.queried_user  */
		let username = req.params.username;
		userModel.findOne({ username }, (error, user)=> {
				if(error) res.status(500).json({ error });
				else if(!user) res.status(404).json( { status: "faliure", msg: "user not found" });
				else{
						req.resourceType = "user"; 
						req.resource = user; // store model
						next(); // pass it
				}
		});
}

const queryUserByCookie = (req, res, next)  =>{
		/* from a given cookie it looks in the settion 
		 * and return the user, it sstores it in req.resorce */
		let { id } = req.user; // get user id from logged in user
		userModel.findById(id, (error, user)=> {
				if(error) res.status(500).json({ error });
				else if(!user) res.status(404).json( { status: "faliure", msg: "user not found" });
				else{
						req.resourceType = "user"; 
						req.resource = user; // change this to queried_user
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
						req.resourceType = "user"; 
						req.resource = user; // change this to queried_user
						next();
				} 
		});
}

const queryUserByToken = (req, res, next)  =>{
		/* with a given token, in req.token 
		 * return the user in the req as req.token_user  */
		let id = req.token.userid; // get user id from logged in user
		userModel.findById(id, (error, user)=> {
				if(error) res.status(500).json({ error });
				else if(!user) res.status(404).json({status: "failure", msg: "user not found with token"});
				else{
						req.resourceType = "user"; 
						req.resource = user; // change this to queried_user
						next();
				} 
		});
}


export { queryUserByUsername, queryUserByCookie, queryUserByEmail, queryUserByToken }
