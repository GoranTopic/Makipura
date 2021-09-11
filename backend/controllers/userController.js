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
		/* update the user in the bd */
		let { id } = req.resource; // get id from queried resorce
		let update = req.body; // get update
		userModel.findByIdAndUpdate(id, update, (error, user) => {
				if(error) res.status(500).json({ error}); // delete for production
				else res.json({ status: "success" });
		});
}

const signupUser = (req, res, next) => {
		/* create user in the db */
		let user = req.body;
		userModel.create(user, (error, user) => {
				if(error) res.status(500).json({ error}); // delete for production
				else res.json({ status: "success" });
		});
}

const signinUser = (req, res, next) => {
		/* left authetification up to passport */
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

