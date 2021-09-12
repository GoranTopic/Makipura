// import post ot be able to query request
/* this method query the databse for the resourse in question
 * it stores it in que req object to be user by other middleware 
 * down the line.
 * this i so that we don't have to query the database twice */
import postModel from "../models/postModel.js"; 
import userModel from "../models/userModel.js";


const queryPostById = (req, res, next)  =>{
		/* given an id, takeit from the db
		 * and store it in resorse */
		let id = req.params.id;
		postModel.findById(id, (error, post)=> {
				if(error) res.status(500);
				if(!post)  res.status(404).json( { status: "faliure", msg: "post not found" });
				else{
						req.resourceType = "post"; 
						req.resource = post;
						next();
				}
		});
}

const queryUserByUsername = (req, res, next) => {
		/* given an username, take it from the db
		 * and store it in resources */
		let username = req.params.username;
		userModel.findOne({ username }, (error, user)=> {
				if(error) res.status(500);
				if(!user) res.status(404).json( { status: "faliure", msg: "user not found" });
				else{
						req.resourceType = "user"; 
						req.resource = user; // store model
						next(); // pass it
				}
		});
}

const queryUserByCookie = (req, res, next)  =>{
		/* from a given cookie it looks in the settion 
		 * and return the user  */
		let { id } = req.user; // get user id from logged in user
		userModel.findById(id, (error, user)=> {
				if(error) res.status(500);
				if(!user) res.status(404).json( { status: "faliure", msg: "user not found" });
				else{
						req.resourceType = "post"; 
						req.resource = user;
						next();
				} 
		});
}


export { queryPostById, queryUserByUsername, queryUserByCookie }
