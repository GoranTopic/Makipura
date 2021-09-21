import express from 'express' ;
import { isAuthenticated , isAuthorized } from '../middlewares/authMiddlewares.js';
import { queryPostById, queryAllPost } from '../middlewares/queryMiddlewares.js';
import { sendHomePagePosts, 
		sendPosts, 
		sendPost, 
		createNewPost, 
		updatePost, 
		deletePost }from  '../controllers/postControllers.js';
import { postValidators, updatePostValidators, validate } from '../middlewares/validationMiddlewares.js';
import { cleanProperties  } from '../middlewares/utilsMiddlewares.js';
import { checkSchema } from 'express-validator';
import multer from 'multer'; // multer


const storage = multer.diskStorage({
		destination: function (req, file, cb) {
				cb(null, 'public/posts/')
		},
		filename: function (req, file, cb) {
				const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
				const filename = file.fieldname + '-' + uniqueSuffix;
				req.body['images'].push(filename);
				cb(null, filename);
  }
})

const upload = multer({ storage }) 
const imageParser = upload.fields([{ name: 'image', maxCount: 5 },]);


const postRouter = express.Router(); // get express router


function fileFilter (req, file, cb) {

  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  // To reject this file pass `false`, like so:
  cb(null, false)

  // To accept the file pass `true`, like so:
  cb(null, true)

  // You can always pass an error if something goes wrong:
  cb(new Error('I don\'t have a clue!'))

}


postRouter.route('/')
		.get(
				sendHomePagePosts
		)
		.post( // make a post 
				imageParser,
				cleanProperties,
				(req, res, next) => {console.log(req.body); next();},
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
