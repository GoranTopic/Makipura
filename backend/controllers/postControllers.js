import postModel from "../models/postModel.js";


const sendHomePagePosts = (req, res, next) => {
		postModel.find({}, (error, posts) => {
				if(error) res.status(500).json({ error: e  }); // if there was an error
				else{
						if(!posts) res.status(404).json({ status: "posts not found" }); // if no post where found
						else res.status(200).json(posts); // post where found
				}
		});
}

const sendAllPost = (req, res, next) => {
		postModel.find({}, (error, posts) => {
				if(error) res.status(500).json({ error: e  }); // if there was an error
				else{
						if(!posts) res.status(404).json({ status: "posts not found" }); // if no post where found
						else res.status(200).json(posts); // post where found
				}
		});
}

const sendPost = (req, res, next) => {
		let id = req.resource._id;
		postModel.findById(id)
				.populate('userid')
				.exec((error, post) => {
						if(error) res.status(500).json({ error: e  }); // if there was an error
						else{
								if(!post) res.status(404).json({ status: "posts not found" }); // if no post where found
								else res.status(200).json(post); // post where found
						}
				});
}


const createNewPost = (req, res, next) => {
		const new_post = { ...req.body, userid: req.user._id  };
		postModel.create(new_post, (error) => {
				if(error) res.status(500).json({ error: e  }); // if there was an error
				else res.status(200).json({status: 'success'}); // post where found
		});
}

const updatePost = (req, res, next) => {
		let id = req.resource._id;
		postModel.findByIdAndUpdate(id, req.body, (error, post) => {
				if(error) res.status(500).json({ error: e  }); // if there was an error
				else{
						if(!post) res.status(404).json({ status: "posts not found" }); // if no post where found
						else res.status(200).json({status: "success"}); // post where found
				}
		});
}


const deletePost = (req, res, next) => {
		let id = req.resource._id;
		postModel.findByIdAndDelete(id, (error) => 	{
				if(error) res.status(500).json({ error: e  }); // if there was an error
				else res.status(200).json({status: "success"}); // post where found
		});
}

export {  sendHomePagePosts, sendAllPost, sendPost, createNewPost, updatePost, deletePost };

