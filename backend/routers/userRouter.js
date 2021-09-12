import express from 'express' ;
import passport from "../config/passport.js";
import { isAuthenticated, isNotAuthenticated, isAuthorized } from "../middlewares/authMiddlewares.js";
import { queryPostById, queryUserByUsername, queryUserByCookie } from "../middlewares/queryMiddlewares.js";
import { sendUser, updateUser, deleteUser, signupUser, signinUser, signoutUser, sendAllUsers, searchUser  } from "../controllers/userControllers.js"

const userRouter = express.Router(); // get express router

userRouter.route('/signup')
		.post(
				isNotAuthenticated, // if it is not logged it
				signupUser
		);

userRouter.route('/signin')
		.post( 
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
				isAuthorized,
				sendUser
		)
		.put(
				queryUserByUsername,
				isAuthorized,
				updateUser
		)
		.delete(
				queryUserByUsername,
				isAuthorized,
				deleteUser
		);


export default userRouter;
