import express from 'express' ;
import PostController from '../controllers/postController.js';


const postRouter = express.Router(); // get express router


postRouter.route('/')
		.get(PostController.getHomePagePosts)
		.post(PostController.createNewPost)

postRouter.route('/all/:page?')
		.get(PostController.getAllPost)

postRouter.route('/id/:id/')
		.get(PostController.getPostById)
		.put(PostController.updatePostById)
		.delete(PostController.deletePostById);

export default postRouter;
