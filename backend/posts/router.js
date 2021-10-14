import express from 'express' ;
import { queryPostById, queryAllPost } from './queries.js';
import { sendHomePagePosts, sendPosts, 
		sendPost, createNewPost, updatePost, deletePost } from  './controllers.js';
import { postValidators, updatePostValidators, validate } from './validators.js';
import { cleanProperties } from './utils.js';
import { limitByTime } from './limiters.js';
import { isAuthorized } from '../auth/authorization.js';
import { isAuthenticated } from '../auth/authentication.js';
import { validateImages, mustHaveImages } from '../images/validators.js';
import { multiFormHandler } from '../multi-form-parser/multer.js';

const postRouter = express.Router(); // get express router

postRouter.route('/')
		.get(
				sendHomePagePosts
		)
		.post( // make a post 
				isAuthenticated, // check is user is signed in
				limitByTime, // limit by time
				multiFormHandler, // handle the multiform input 
				cleanProperties, // clean req.body properties
				mustHaveImages, // create post must have an image
				validateImages, // validate images
				validate(postValidators), // validate text input
				createNewPost, // create the post
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
				isAuthenticated, // has user signed in
				multiFormHandler, // handle the multiform input 
				cleanProperties,
				queryPostById,
				isAuthorized,
				validateImages, // validate images
				validate(updatePostValidators), // run validators 
				updatePost
		)
		.delete(
				isAuthenticated, // check if user is logged in
				queryPostById, // check post queried
				isAuthorized, // is authorized to delete post ? 
				deletePost, // do the deleting
		);

export default postRouter;
