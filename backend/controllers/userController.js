import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';


const whoAmI = (req, res, next) => {

}

const sendUser = (req, res, next) => { // TEST THIS
		let user = { ...req.resource }; // get user from query
		user._id = 0;
		delete user["admin"];
		delete user.__v;
		if(user) res.json(user);
		else res.status(500).json({ status: `faliure` });
}


const deleteUser = (req, res, next) => {
		//implement find my id
		let user = req.resource;
		let result; 
		try{
				result = await userModel.deleteById({ username });
				console.log("result: ");
				console.log(result);
				if(result.deletedCount) res.json({ status: "success" });
				else res.status(404).json({ status: `could not find user` });
		}catch(e){ 
				console.error(`error: ${e}`); 
				res.status(500).json({ error: e  });
		}
}

const updateUser = (req, res, next) => {
		//implement find my id

		let username = req.params.username;
		let update = req.body;
		let result; 
		try{
				result = await userModel.updateOne({ username }, update, (err, user) => {
						console.log(err)

				});
				console.log(result);
				if(result) res.json({ status: "success" });
				else res.status(404).json({ status: `could not find user` });
		}catch(e){ 
				console.error(`could not ${e}`); 
				res.status(500).json({ error: e  });
		}
}

const signupUser = (req, res, next) => {
		let result;
		try{  
				result = await userModel.create(req.body);
				if(result){  
						res.json({ status: "success" });
				}
				else res.status(404).json({ status: "could not create user" });
		}catch(e){ 
				console.error(`could not query home page posts ${e}`); 
				res.status(500).json({ error: e  });
		}
}

const signinUser = (req, res, next) => {
		/* if th router got to here, 
		 * it means it got passed the passport middleware auth */
		// left authetification up to passport 
		// get the username and password from the request
		/* 
				const { username, email, password } = req.body;
				const filter = (username)?{ username: username }:{ email: email }
				console.log("session :");
				userModel.findOne( filter, (error, user) =>{
						if(user){ // if the user if found in the db
								bcrypt.compare(password, user.password, (error, same) =>{
										if(same){
												// password is the same, store user session
												console.log(user.username + " has logged in");
												req.session.userId = user._id;
												req.session.isAuth = true;
												res.status(200).json({ status: "success" });
										} else { // if the password hashs to the same
												console.log("passwords does not match");
												console.log(error);
												res.status(500).json({
														error: "Incorrect username or password" 
												});
										}
								});
						}else{ // if the use was not found
								console.log("no user: " + user + " found");
								console.log(error);
								res.status(500).json({ 
										error: "Incorrect username or password" 
								});
						}
				});
				*/
												res.status(200).json({ status: "success" });
										}

const signoutUser = (req, res, next) => {
		req.logout(); // call logout from passport
		req.session.destroy((error) => { // destroy session
				if(error) res.status(500);
				else res.status(200).json({ status: "success" });
		});
}

const getAllUsers = (req, res, next) => {
		let users;
		try{
				users = await userModel.find({}).select('+password').select('+email');
				res.json(users);
		}catch(e){ 
				console.error(`could not query all posts: ${e}`); 
				res.status(500).json({ error: e  });
		}
}


const searchUser = (req, res, next) => {
		/* todo */

}


export default { whoAmI, sendUser, updateUser, deleteUser, signupUser, signinUser, signoutUser, getAllUsers, searchUser  };

