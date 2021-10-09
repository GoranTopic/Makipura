import express from 'express' ;
import { queryPostById, queryAllPost } from './queries.js';
import { sendStore, sendStores, createNewStore, 
		updateStore, deleteStore } from  './controllers.js';
import { storeValidators, updateStoreValidators, validate } from './validators.js';
import { cleanProperties } from './utils.js';
import { isAuthorized } from '../auth/authorization.js';
import { isAuthenticated } from '../auth/authentication.js';
import { validateImages } from '../images/validators.js';
import { multiFormHandler } from '../multi-form-parser/multer.js';
import { isVerified } from '../users/utils.js';
import { queryUserByCookie } from '../users/queries.js';

const storeRouter = express.Router(); // get express router

storeRouter.route('/')
		.get(
				sendHomePagePosts
		)
		.post( // make a post 
				isAuthenticated, // check is user is signed in
				queryUserByCookie, // query the user
				isVerified, // do not allow to create store if it is not verified
				multiFormHandler, // handle the multiform input 
				cleanProperties, // clean req.body properties
				validateImages, // validate images
				validate(storeValidators), // validate text input
				createNewStore, // create the post
		);

storeRouter.route('/all/:page?')
		.get(
				queryAllPost,
				sendPosts
		);

storeRouter.route('/id/:id/')
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

export default storeRouter;
