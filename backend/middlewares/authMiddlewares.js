import postModel from "../models/postModel.js";

const authorization_rules = [  
		{ 
				type: 'post',
				description: "if user is owner",
				authorizer: (user, resource) => resource.userid.equals(user._id),
		},{
				type: 'post',
				description: "if user is admin",
				authorizer: (user, resource) => user.admin,
		},{
				type: 'user',
				description: "if user is chagning it own profile",
				authorizer: (user, resource) => resource._id.equals(user._id),
		},{
				type: 'user',
				description: "if user is admin",
				authorizer: (user, resource) => user.admin,
		}
]


const cookieValidator = (req, res, next) =>{
		/*  */

}

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
		// if the user is admin let it pass
		if(inquirer.admin) next();
		// check if we got inquirer
		if(!inquirer){ 
				console.log("could not get logged in user"); 
				res.status(500).json({ 
						status: 'faliure', 
						msg: 'could not get logged in user in isAuthorized' });
		}
		// check if we got resource
		if(!resource){   
				console.error("could not get resorce"); 
				res.status(500).json({ 
						status: 'faliure', 
						msg: 'could not get resorce in isAuthorized' });
		}
		// check what kind of obj we are dealing with 
		if(req.resourceType === 'post'){ 
				// we are dealing with a post obj
				// to authorize this post, userid on post most 
				// be the same as inquirer's id 
				console.log(req.baseUrl);
				console.log('inquirer:');
				console.log(inquirer);
				console.log('resource:');
				console.log(resource);
				console.log(typeof resource)
				if(inquirer._id.equals(resource.userid)){
						next(); // move along
				}else{ // you shall not pass
						res.status(500).json({ 
								status: 'faliure', 
								msg: 'unauthorized' });
				}
		}else if(req.baseUrl === '/user'){ 
				// we are dealing with a user obj
				// to authorize this post, userid on post most 
				// be the same as inquirer's id 
				console.log(req.baseUrl);
				console.log('inquirer:');
				console.log(inquirer);
				console.log('resource:');
				console.log(resource);
				console.log(typeof resource)
				if(inquirer._id.equals(resource._id)){
						next(); // move along
				}else{ // you shall not pass
						res.status(500).json({ 
								status: 'faliure', 
								msg: 'unauthorized' });
				}		}else{
				console.log("could not get baseUrl"); 
				res.status(500).json({ 
						status: 'faliure', 
						msg: 'could not get logged in user in isAuthorized' });
		}
}



const isAuthorizedOld = (req, res, next) =>{
		/* check is the logged in user is the owner of the post */
		let inquirer = req.user; // get logged in user
		let resource  = req.resource; // get the resource wanting to access
		// if the user is admin let it pass
		if(inquirer.admin) next();
		// check if we got inquirer
		if(!inquirer){ 
				console.log("could not get logged in user"); 
				res.status(500).json({ 
						status: 'faliure', 
						msg: 'could not get logged in user in isAuthorized' });
		}
		// check if we got resource
		if(!resource){   
				console.error("could not get resorce"); 
				res.status(500).json({ 
						status: 'faliure', 
						msg: 'could not get resorce in isAuthorized' });
		}
		// check what kind of obj we are dealing with 
		if(req.resourceType === 'post'){ 
				// we are dealing with a post obj
				// to authorize this post, userid on post most 
				// be the same as inquirer's id 
				console.log(req.baseUrl);
				console.log('inquirer:');
				console.log(inquirer);
				console.log('resource:');
				console.log(resource);
				console.log(typeof resource)
				if(inquirer._id.equals(resource.userid)){
						next(); // move along
				}else{ // you shall not pass
						res.status(500).json({ 
								status: 'faliure', 
								msg: 'unauthorized' });
				}
		}else if(req.baseUrl === '/user'){ 
				// we are dealing with a user obj
				// to authorize this post, userid on post most 
				// be the same as inquirer's id 
				console.log(req.baseUrl);
				console.log('inquirer:');
				console.log(inquirer);
				console.log('resource:');
				console.log(resource);
				console.log(typeof resource)
				if(inquirer._id.equals(resource._id)){
						next(); // move along
				}else{ // you shall not pass
						res.status(500).json({ 
								status: 'faliure', 
								msg: 'unauthorized' });
				}		}else{
				console.log("could not get baseUrl"); 
				res.status(500).json({ 
						status: 'faliure', 
						msg: 'could not get logged in user in isAuthorized' });
		}
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
