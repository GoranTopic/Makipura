import PostDAO from  '../dao/postDAO.js';

class PostController {

		static async getHomePagePosts(req, res, next){
				try{  
						const response = await PostDAO.getAll();
						res.json(response);
				}catch(e){ 
						console.error(`could not query home page posts ${e}`); 
						res.status(500).json({ error: e  });
				}
		}

		static async getAllPost(req, res, next){
				try{
						const response = await PostDAO.getAll();
						res.json(response);
				}catch(e){ 
						console.error(`could not query all posts: ${e}`); 
						res.status(500).json({ error: e  });
				}
		}

		static async getPostById(req, res, next){
				let id = req.params.id;
				try{  
						let post = await PostDAO.findById(id);
						if(!post){// if no post found
								res.status(404).json({ error: `post ${id} not found` });
								console.error(`could not query post ${id}`); 
								return 
						}else res.json(post);
				}catch(e){ 
						console.error(`could not query post ${id}: ${e}`); 
						res.status(500).json({ error: e  });
				}
		}

		static async createNewPost(req, res, next){
				let response;
				try{
						response = await PostDAO.store(req.body);
						console.log(response);
						if(response) res.json({ status: "success" });
						else res.status(500).json({ status: response });
				}catch(e){ 
						console.error(`Could not create post: ${e}`); 
						res.status(500).json({ error: e });
				}

		}

		static async updatePostById(req, res, next){
				let response;
				let id = req.params.id; // get the id
				try{  
						response = await PostDAO.updateById(id, req.body);
						if(!response){// if no post found
								res.status(404).json({ error: `post ${id} not found` });
								console.error(`could not query post ${id}`); 
								return  
						}else res.json({ status: "success" });
				}catch(e){ 
						console.error(`could not query post ${id}: ${e}`); 
						res.status(500).json({ error: e  });
				}
		}


		static async deletePostById(req, res, next){
				let response;
				let id = req.params.id; // get the id
				try{  
						let response = await PostDAO.deleteById(id);
						if(!response){// if no post found
								res.status(404).json({ error: `post ${id} not found` });
								console.error(`could not query post ${id}`); 
								return 
						}else res.json({ status: "success" });
				}catch(e){ 
						console.error(`could not query post ${id}: ${e}`); 
						res.status(500).json({ error: e  });
				}
		}





}


export default PostController;

