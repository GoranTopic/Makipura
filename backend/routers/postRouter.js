import express from 'express' ;
import postController from '../controllers/postControllers.js';
import { isAuthenticated , isAuthorized } from '../middlewares/authMiddlewares.js';
import { queryPostById } from '../middlewares/queryMiddlewares.js';

const postRouter = express.Router(); // get express router

postRouter.route('/')
		.get(postController.getHomePagePosts)
		.post(
				isAuthenticated,
				postController.createNewPost
		)

postRouter.route('/all/:page?')
		.get(postController.getAllPost)

postRouter.route('/id/:id/')
		.get(postController.getPostById)
		.put(
				isAuthenticated,
				queryPostById,
				isAuthorized,
				postController.updatePostById
		)
		.delete(
				isAuthenticated, 
				isAuthorized, 
				postController.deletePostById
		);

export default postRouter;
