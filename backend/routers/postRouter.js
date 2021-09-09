import express from 'express' ;
import postController from '../controllers/postController.js';

const postRouter = express.Router(); // get express router

postRouter.route('/')
		.get(postController.getHomePagePosts)
		.post(postController.createNewPost)

postRouter.route('/all/:page?')
		.get(postController.getAllPost)

postRouter.route('/id/:id/')
		.get(postController.getPostById)
		.put(postController.updatePostById)
		.delete(postController.deletePostById);

export default postRouter;
