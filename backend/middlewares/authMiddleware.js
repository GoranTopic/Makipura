import postModel from "../models/postModel.js";


const noCUDIfUnauthenticated = (req, res, next) => { 
		/* throws an error when there are POST PUT DELETE request from non-authenticated user */
		if( req.method !== 'GET' && !req.isAuthenticated() ) // might be post or put of delete
				// if there is a CUD request and user is not authenticated, return error message
				res.status(401).json({ status: 'faliure', msg: "user is not logged in"});
		else // the reques is a GET
				next(); // let it pass
}


const cookieValidator = (req, res, next) =>{
		/*  */

}

const isAuth = (req, res, next) => { 
		/* throws an error if it gets an reques from an  non-authenticated user */
		if(!req.isAuthenticated())
				// if there is a request and user is not authenticated, return error message
				res.status(401).json({ status: 'faliure', msg: "user is not logged in"});
		else next(); // let it pass
}

const isNotAuth = (req, res, next) => { 
		/* throws an error if it gets an reques from an authenticated user */
		if(req.isAuthenticated())
				// if there is a request and the user is authenticated, returns error message
				res.status(401).json({ status: 'faliure', msg: "user is logged in"});
		else next(); // let it pass
}

const isPostOwner = (req, res, next) =>{
		/* check is the logged in user is the owner of the post */
		let post_id = req.params.id;
		postModel.findById(post_id, (error, post ) =>{
				if(error){ // if could not find post 
						res.status(404).json({ status: "faliure", msg: "post not found" });
				}else{ // post found
						if(req.user._id.equals(post.userid)){ // user is the owner
								next();  // you shall pass
						}else{
								// you shall not pass
								res.status(401).json({ status: 'faliure', msg: "unauthorized"});
						}
				}
		});
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



export { noCUDIfUnauthenticated, cookieValidator, isAuth, isNotAuth, isPostOwner, isUserOwner }
