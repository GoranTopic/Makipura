import express from 'express' ;
import postController from '../controllers/postController.js';
import { isAuth, isPostOwner } from '../middlewares/authMiddleware.js';

const postRouter = express.Router(); // get express router

postRouter.route('/')
		.get(postController.getHomePagePosts)
		.post(isAuth, postController.createNewPost)

postRouter.route('/all/:page?')
		.get(postController.getAllPost)

postRouter.route('/id/:id/')
		.get(postController.getPostById)
		.put(isAuth, isPostOwner, postController.updatePostById)
		.delete(isAuth, isPostOwner, postController.deletePostById);

export default postRouter;
