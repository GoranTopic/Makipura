import userModel from "../users/models.js";
import bcrypt from 'bcrypt';

// function for picking only some field from an object
const pick = (obj, arr) =>
		arr.reduce((acc, record) => 
				(record in obj && (acc[record] = obj[record]), acc), {});

// user selected field to send back
const selectFields = ['username', 'firstname', 'lastname', 'profileImage', 'backgroundImage'];

// check resource is passedin req
const checkResource = (resource) => resource || res.status(500).json({ status: 'faliure', msg: 'resource not queried' })

const sendUser = (req, res, next) => {
		/* from a given user stored in req.resource, remove unwanted fields
		 * and return to client */
		checkResource(req.resource); // check if user has already been queried
		let user =  pick(req.resource, selectFields)  ; // get user from query
		if(user) res.json(user);
		else res.status(500).json({ status: `faliure` });
}


const deleteUser = (req, res, next) => {
		//implement find my id
		checkResource(req.resource);
		let { id } = req.resource; // extract user
		userModel.findByIdAndDelete(id, (error, user) => {
				if(error) res.status(500).json({ error}); // delete for production
				else res.json({ status: "success" });
		});
}

const updateUser = (req, res, next) => {
		/* update the user in the bd */
		checkResource(req.resource);
		let { id } = req.resource; // get id from queried resorce
		let update = req.body; // get update
		userModel.findByIdAndUpdate(id, update, (error, user) => {
				if(error) res.status(500).json({ error}); // delete for production
				else res.json({ status: "success" });
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



export  { sendUser, updateUser, deleteUser, sendAllUsers, searchUser };

