import postModel from "../posts/models.js";
import { authorization_rules } from './config.js';

const isAuthorized = (req, res, next) =>{
		/* check is the logged in user is the owner of the post */
		let inquirer = req.user; // get logged in user
		let resource  = req.resource; // get the resource wanting to access
		let resourceType = req.resourceType;
		// check if we got inquirer
		if(!inquirer || !resource) res.status(500).json({ status: 'faliure' });
		// get all the rules for a given type
		let rules = authorization_rules.filter((rule) => resourceType === rule.type);
		// if the user meets any of the authorization rules, let them pass
		let failedAll = rules.every( rule => !rule.passes(inquirer, resource) );
		// if they didn't pass any rule, block them
		if(failedAll) res.status(403).json({status: 'faliure', msg: 'Unauthorized'})
		// else they passed one rule, le them pass 
		else next();
}

const isUserOwner = (req, res, next) =>{
		/* check is the logged user is the owner of the User data */
		let filter = { username: req.params.username };
		postModel.findOne(filter, (error, user ) =>{
				if(error){ // if could not find user 
						res.status(404).json({ status: "faliure", msg: "user not found" });
				}else{ // user found
						if(req.user._id.equals(user._id)){ // user is the owner
								next();  // you shall pass
						}else{
								// you shall not pass
								res.status(401).json({ status: 'faliure', msg: "unauthorized"});
						}
				}
		});
}

export { isAuthorized } 

