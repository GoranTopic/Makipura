import postModel from "../models/postModel.js";

class postController {

		static async getHomePagePosts(req, res, next){
				let posts;
				try{  
						posts = await postModel.find({});
						if(posts) res.json(posts);
						else res.status(404).json({ status: "posts not found" });
				}catch(e){ 
						console.error(`could not query home page posts ${e}`); 
						res.status(500).json({ error: e  });
				}
		}

		static async getAllPost(req, res, next){
				let posts;
				try{
						posts = await postModel.find({});
						res.json(posts);
				}catch(e){ 
						console.error(`could not query all posts: ${e}`); 
						res.status(500).json({ error: e  });
				}
		}

		static async getPostById(req, res, next){
				let id = req.params.id;
				let post;
				try{  
						post = await postModel.findById(id).populate('userid');
						if(post) res.json(post);
						else res.status(404).json({ status: "post not found" });
				}catch(e){ 
						console.error(`could not query post ${id}: ${e}`); 
						res.status(500).json({ error: e  });
				}
		}

		static async createNewPost(req, res, next){
				let result;
				const new_post = { ...req.body, userid: req.user._id  };
				try{
						result = await postModel.create(new_post);
						if(result) res.json({ status: "success" });
						else res.status(500).json({ status: "faliure" });
				}catch(e){ 
						console.error(`Could not create post: ${e}`); 
						res.status(500).json({ error: e });
				}

		}

		static async updatePostById(req, res, next){
				let result;
				let id = req.params.id; // get the id
				try{  
						result = await postModel.findByIdAndUpdate(id, req.body);
						if(result) res.json({ status: "success" });
						else res.status(404).json({ status: "faliure" });
				}catch(e){ 
						console.error(`could not query post ${id}: ${e}`); 
						res.status(500).json({ error: e  });
				}
		}


		static async deletePostById(req, res, next){
				let result;
				let id = req.params.id; // get the id
				try{  
						let result = await postModel.findByIdAndDelete(id);
						if(result) res.json({ status: "success" });
						else res.status(404).json({ status: "faliure" });
				}catch(e){ 
						console.error(`could not query post ${id}: ${e}`); 
						res.status(500).json({ error: e  });
				}
		}

}


export default postController;

