const queryUserByUsername = (req, res, next) => {
		/* given an username, take it from the db
		 * and store it in resources */
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
		 * and return the user  */
		let { id } = req.user; // get user id from logged in user
		userModel.findById(id, (error, user)=> {
				if(error) res.status(500).json({ error });
				else if(!user) res.status(404).json( { status: "faliure", msg: "user not found" });
				else{
						req.resourceType = "post"; 
						req.resource = user;
						next();
				} 
		});
}

export { queryUserByUsername, queryUserByCookie }
