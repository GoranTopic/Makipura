// import post ot be able to query request
/* this method query the databse for the resourse in question
 * it stores it in que req object to be user by other middleware 
 * down the line: req.resource = query
 * this is so that we don't have to query the database twice */

import storeModel from "./models.js"; 
import userModel from "../users/models.js";


const queryStoreById = (req, res, next)  =>{
		/* given an id, takeit from the db
		 * and store it in resorse */
		let id = req.params.id;
		postModel.findById(id)
				.populate('userid', '-admin -__v', )
				.exec((error, store) => {
						if(error) res.status(500).json({error});
						else if(!post) res.status(404).json( { status: "faliure", msg: "post not found" });
						else{
								req.resourceType = "store"; 
								req.store = store;
								next();
						}
				});
}

const queryAllStores = (req, res, next)  =>{
		/* query all the post from db, in production,
		 * delete this and only use pagination */
		storeModel.find({})
				.populate('userid')
				.exec((error, store) => {
						if(error) res.status(500);
						else{
								req.resourceType = "store"; 
								req.store = store;
								next();
						}
				});
}

export { queryStoreById, queryAllStores, }
