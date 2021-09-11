import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';

// function for picking only some field from an object
const pick = (obj, arr) =>
		arr.reduce((acc, record) => 
				(record in obj && (acc[record] = obj[record]), acc), {});

// user selected field to send back
const selectFields = ['username', 'firstname', 'lastname', 'image'];

const sendUser = (req, res, next) => {
		/* from a given user stored in req.resource, remove unwanted fields
		 * and return to client */
		let user =  pick(req.resource, selectFields)  ; // get user from query
		if(user) res.json(user);
		else res.status(500).json({ status: `faliure` });
}


const deleteUser = (req, res, next) => {
		//implement find my id
		let { id } = req.resource; // extract user
		userModel.findByIdAndDelete(id, (error, user) => {
				if(error) res.status(500).json({ error}); // delete for production
				else res.json({ status: "success" });o
		});
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

const sendAllUsers =  async (req, res, next) => {
		let users;
		try{
				users = await userModel.find({})
						.select('-password')
						.select('-admin')
						.select('-email')
						.select('-_id')
						.select('-__v');
				res.json(users);
		}catch(e){ 
				console.error(`could not query all posts: ${e}`); 
				res.status(500).json({ error: e  });
		}
}


const searchUser = async (req, res, next) => {
		/* todo */
		let filter = {}; 
		let users;
		try{
				users = await userModel.find(filter)
						.select('-password')
						.select('-admin')
						.select('-email')
						.select('-_id')
						.select('-__v');
				res.json(users);
		}catch(e){ 
				console.error(`could not query all posts: ${e}`); 
				res.status(500).json({ error: e  });
		}

}


export  { sendUser, updateUser, deleteUser, signupUser, signinUser, signoutUser, sendAllUsers, searchUser  };

