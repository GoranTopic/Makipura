// import post ot be able to query request
/* this method query the databse for the resourse in question
 * it stores it in que req object to be user by other middleware 
 * down the line: req.resource = query
 * this is so that we don't have to query the database twice */

import postModel from "./models.js"; 
import userModel from "../users/models.js";


const queryPostById = (req, res, next)  =>{
		/* given an id, takeit from the db
		 * and store it in resorse */
		let id = req.params.id;
		postModel.findById(id)
				.select('-__v')
				//.populate('userid', '-admin -__v -_id -loginType -backgroundImage ', )
				.exec((error, post) => {
						if(error) res.status(500).json({error});
						else if(!post) res.status(404).json( { status: "failure", msg: "post not found" });
						else{
								req.resourceType = "post"; 
								req.resource = post;
								next();
						}
				});
}

const queryAllPost = (req, res, next)  =>{
		/* query all the post from db, in production,
		 * delete this and only use pagination */
		postModel.find({})
				.populate('userid')
				.exec((error, posts) => {
						if(error) res.status(500);
						else{
								req.resourceType = "posts"; 
								req.resource = posts;
								next();
						}
				});
}

export { queryPostById, queryAllPost, }
