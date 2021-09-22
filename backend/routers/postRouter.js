import express from 'express' ;
import { isAuthenticated , isAuthorized } from '../middlewares/authMiddlewares.js';
import { queryPostById, queryAllPost } from '../middlewares/queryMiddlewares.js';
import { 
		sendHomePagePosts, sendPosts, sendPost, 
		createNewPost, updatePost, deletePost } from  '../controllers/postControllers.js';
import { postValidators, updatePostValidators, validate } from '../middlewares/validationMiddlewares.js';
import { cleanProperties  } from '../middlewares/utilsMiddlewares.js';
import { validateUploadedImages } from '../validators/imageValidation.js';
import multer from 'multer'; // multer


const diskStorage = multer.diskStorage({
		destination: function (req, file, cb){
				cb(null, 'public/posts/')
		},
		filename: function (req, file, cb){
				let extension = file.mimetype.split("/")[1];
				let uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
				let filename = file.fieldname + '-' + uniqueSuffix + '.' + extension;
				cb(null, filename);
  }
})

const memoryStorage = multer.memoryStorage();

const upload = multer({
		storage: diskStorage, //memoryStorage,
		limits: {
				fileSize: 10000000,// number of bytes
				fields: 10,
				files: 10,
		},
		fileFilter: fileFilter,
		preservePath: true,
});

const imageParser = upload.fields([{ name: 'image', maxCount: 6 },]);

const postRouter = express.Router(); // get express router


async function fileFilter (req, file, cb) {
		const AllowedMimeTypes = /jpg|png|jpeg/ ;
		let extension = file.mimetype.split("/")[1];
		let found = extension.match(AllowedMimeTypes)
		if(found){ // if it has an allowed Mimetype
				cb(null, true); // alow to pass
		}else{
				//cb(null, false); // deny
				cb(new Error('file is not a image'));
		}
}




const multerMiddleware = (req, res, next) => {
		imageParser(req, res, function (error) {
				if (error instanceof multer.MulterError) {
						console.error(error)
						res.status(500); // A Multer error occurred when uploading.
				}else if (error) {
						// An unknown error occurred when uploading.
						console.error(error);
						res.status(400).json({ status: 'failure', msg: error });
				}else{
						// Everything went fine.	
						next();
				}
		});
}


postRouter.route('/')
		.get(
				sendHomePagePosts
		)
		.post( // make a post 
				//(req, res, next) => {req.body['images'] = []; next();},
				//(req, res, next) => {console.log(req.body); next();},
				multerMiddleware,
				cleanProperties, 
				//(req, res, next) => { console.log(req.files); next(); },
				isAuthenticated,
				validateUploadedImages,
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
