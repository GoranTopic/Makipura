import postModel from "../models/postModel.js";

const authorization_rules = [  
		{ 
				type: 'post',
				description: "if user is owner",
				passes: (user, resource) => resource.userid.equals(user._id),
		},{
				type: 'post',
				description: "if user is admin",
				passes: (user, resource) => user.admin,
		},{
				type: 'user',
				description: "if user is chagning it own profile",
				passes: (user, resource) => resource._id.equals(user._id),
		},{
				type: 'user',
				description: "if user is admin",
				passes: (user, resource) => user.admin,
		}
]


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
						console.log(req.user._id) // reuqest user id
						console.log(user._id) // databse user id
						if(req.user._id.equals(user._id)){ // user is the owner
								next();  // you shall pass
						}else{
								// you shall not pass
								res.status(401).json({ status: 'faliure', msg: "unauthorized"});
						}
				}
		});
}



export {  isAuthenticated, isNotAuthenticated, isAuthorized } 
