import express from 'express' ;
import passport from "../config/passport.js";
import { isAuthenticated, isNotAuthenticated, isAuthorized } from "../middlewares/authMiddlewares.js";
import { queryPostById, queryUserByUsername, queryUserByCookie } from "../middlewares/queryMiddlewares.js";
import { sendUser, updateUser, deleteUser, signupUser, signinUser, signoutUser, sendAllUsers, searchUser  } from "../controllers/userControllers.js"
import { userValidators, updateUserValidators, validate } from '../middlewares/validationMiddlewares.js';
import { cleanProperties  } from '../middlewares/utilsMiddlewares.js';
import multer from 'multer'; // multer

const userRouter = express.Router(); // get express router
const upload = multer({ dest: 'uploads/' }) 

userRouter.route('/signup')
		.post(
				isNotAuthenticated, // if it is not logged it turn away
				cleanProperties,
				validate( userValidators ), // run validators
				upload.single('image'),
				signupUser
		);

userRouter.route('/signin')
		.post( 
				cleanProperties,
				// require user to log out before signing in
				isNotAuthenticated, 
				// passport handles sign in
				passport.authenticate('local'), 
				signinUser
		);

userRouter.route('/signout')
		.post(
				// can't sign out if user is not signed in
				isAuthenticated, 
				// sign out user
				signoutUser
		);

userRouter.route('/all/:page?')
		.get(
				sendAllUsers
		);


userRouter.route('/whoami')
		.get(
				isAuthenticated,
				queryUserByCookie,
				sendUser,
		);

userRouter.route('/:username/')
		.get(
				// query the user
				queryUserByUsername, 
				sendUser
		)
		.put(
				isAuthenticated, // user must be logged in
				queryUserByUsername, // check user request
				validate( updateUserValidators ), // run vlidators
				isAuthorized, // check is user is authorized
				updateUser // update databse
		)
		.delete(
				isAuthenticated,
				queryUserByUsername,
				isAuthorized,
				deleteUser
		);


export default userRouter;
