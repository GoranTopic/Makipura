import PostDAO from  '../dao/postDAO';

class PostController {
	
		static async getHomePagePosts(req, res, next){
				const response = await PostDAO.getAllPosts();
				res.json(response);
		}

		static async getAllPost(req, res, next){
				const response = await PostDAO.getAllPosts();
				res.json(response);
		}

		static async getPostById(req, res, next){
				let id = req.params.id
		}

}
