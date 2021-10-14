import storeModel from "./models.js";
// user selected field to send back
const selectFields = ['username', 'firstname', 'lastname', 'image'];

// function for picking only some field from an object
const pick = (obj, arr) =>
		arr.reduce((acc, record) => 
				(record in obj && (acc[record] = obj[record]), acc), {});

// sherd an objct from its fields,
const sherdUserObj = (user) => pick(user, selectFields);

//sherd and array of objs
const sherdArrUserObj = (users) =>  users.forEach(user => sherdUserObj(user));

const sendAllStores = (req, res, next) => {
		storeModel.find({}, (error, posts) => {
				if(error) res.status(500).json({ error: e  }); // if there was an error
				else{
						if(!posts) res.status(404).json({ status: "posts not found" }); // if no post where found
						else res.status(200).json(posts); // post where found
				}
		});
}

const sendStore = (req, res, next) => {
		let store = req.store;
		res.status(200).json(store);
}

const sendStores = (req, res, next) => {
		let store = req.store;
		res.status(200).json(store);
}

const createNewStore = (req, res, next) => {
		// it get a user 
		let userid  = req.user._id;
		let new_store = {
				...req.body,
				storeBackgroundImage: { ...req.files.storeBackgroundImage, userid: userid },
				storeProfileImage: { ...req.files.storeProfileImage, userid: userid },
		}
		storeModel.create(new_store, (error, post) => {
				if(error) res.status(500).json({ error  }); // if there was an error
				else res.status(200).json({ // post where found
						status: 'success', 
						msg: store._id, 
				});
		});
}

const updateStore = (req, res, next) => {
		let id = req.store._id;
		postModel.findByIdAndUpdate(id, req.body, (error, post) => {
				if(error) res.status(500).json({ error }); // if there was an error
				else{
						if(!post) res.status(404).json({ status: "posts not found" }); // if no post where found
						else res.status(200).json({status: "success"}); // post where found
				}
		});
}

const deleteStore = (req, res, next) => {
		let id = req.store._id;
		storeModel.findByIdAndDelete(id, (error) => 	{
				if(error) res.status(500).json({ error }); // if there was an error
				else res.status(200).json({status: "success"}); // post where found
		});
}

export { sendStore, sendAllStores, sendStores, createNewStore, updateStore, deleteStore };
