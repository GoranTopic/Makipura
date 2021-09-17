import express from 'express' ;
import { isAuthenticated , isAuthorized } from '../middlewares/authMiddlewares.js';
import { queryPostById, queryAllPost } from '../middlewares/queryMiddlewares.js';
import { sendHomePagePosts, 
		sendPosts, 
		sendPost, 
		createNewPost, 
		updatePost, 
		deletePost }from  '../controllers/postControllers.js';
import { postValidators, validate } from '../middlewares/validationMiddlewares.js';
import { cleanProperties  } from '../middlewares/utilsMiddlewares.js';
import { checkSchema } from 'express-validator';

const postRouter = express.Router(); // get express router

postRouter.route('/')
		.get(
				sendHomePagePosts
		)
		.post( // make a post 
				cleanProperties,
				isAuthenticated,
				validate(postValidators), // run validators 
				createNewPost
		);

postRouter.route('/all/:page?')
		.get(
				queryAllPost,
				sendPosts
		);

postRouter.route('/id/:id/')
		.get(
				queryPostById,
				sendPost,
		)
		.put(
				cleanProperties,
				isAuthenticated,
				queryPostById,
				isAuthorized,
				updatePost
		)
		.delete(
				isAuthenticated, // check if user is logged in
				queryPostById, // check post queried
				isAuthorized, // is authorized to delete post ? 
				deletePost, // do the deleting
		);

export default postRouter;
