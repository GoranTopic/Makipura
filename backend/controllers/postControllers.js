import postModel from "../models/postModel.js";

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


const sendHomePagePosts = (req, res, next) => {
		postModel.find({}, (error, posts) => {
				if(error) res.status(500).json({ error: e  }); // if there was an error
				else{
						if(!posts) res.status(404).json({ status: "posts not found" }); // if no post where found
						else res.status(200).json(posts); // post where found
				}
		});
}


const sendPost = (req, res, next) => {
		let post = req.resource;
		res.status(200).json(post);
}

const sendPosts = (req, res, next) => {
		let posts = req.resource; // get posts list
		res.status(200).json(posts);
}


const createNewPost = (req, res, next) => {
		const new_post = { ...req.body, userid: req.user._id  };
		postModel.create(new_post, (error, post) => {
				if(error) res.status(500).json({ error  }); // if there was an error
				else res.status(200).json({ // post where found
						status: 'success', 
						msg: post._id, 
				});
		});
}

const updatePost = (req, res, next) => {
		let id = req.resource._id;
		postModel.findByIdAndUpdate(id, req.body, (error, post) => {
				if(error) res.status(500).json({ error }); // if there was an error
				else{
						if(!post) res.status(404).json({ status: "posts not found" }); // if no post where found
						else res.status(200).json({status: "success"}); // post where found
				}
		});
}


const deletePost = (req, res, next) => {
		let id = req.resource._id;
		postModel.findByIdAndDelete(id, (error) => 	{
				if(error) res.status(500).json({ error }); // if there was an error
				else res.status(200).json({status: "success"}); // post where found
		});
}

export {  sendHomePagePosts, sendPosts, sendPost, createNewPost, updatePost, deletePost };

