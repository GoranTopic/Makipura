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

const sendStore = (req, res, next) => {
		let post = req.resource;
		res.status(200).json(post);
}

const sendStores = (req, res, next) => {
		let store = req.resource; 
		res.status(200).json(posts);
}

const createNewStore = (req, res, next) => {
		// it get a user 
		let userid  = req.user._id;
		let images = req.files.image.map(image => { return { ...image, userid: userid }}); 
		let new_post = { ...req.body, userid: userid, images: images  };
		postModel.create(new_post, (error, post) => {
				if(error) res.status(500).json({ error  }); // if there was an error
				else res.status(200).json({ // post where found
						status: 'success', 
						msg: post._id, 
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

export { sendStore, sendStores, createNewStore, updateStore, deleteStore };

