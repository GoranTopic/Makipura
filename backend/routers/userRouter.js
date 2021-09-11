import express from 'express' ;
import passport from "../config/passport.js";
import { isAuth, isNotAuth, isUserOwner } from "../middlewares/authMiddleware.js";
import { queryPostById, queryUserByUsername, queryUserByCookie } from "../middlewares/queryMiddleware.js";
import { sendUser, updateUser, deleteUser, signupUser, signinUser, signoutUser, sendAllUsers, searchUser  } from "../controllers/userControllers.js"

const userRouter = express.Router(); // get express router

userRouter.route('/signup')
		.post(
				signupUser);

userRouter.route('/signin')
		.post( 
				isNotAuth, // require user to log out before signing in
				passport.authenticate('local'), 
				signinUser);

userRouter.route('/signout')
		.post(isAuth, // can't sign out if user is not signed in
				signoutUser);

userRouter.route('/all/:page?')
		.get(
				sendAllUsers
		);

userRouter.route('/:username/')
		.get(
				queryUserByUsername, 
				sendUser
		)
		.put(
				queryUserByUsername,
				updateUser
		)
		.delete(
				queryUserByUsername,
				deleteUser
		);

userRouter.route('/whoami')
		.get(
				isAuth,
				queryUserByCookie,
				sendUser,
		);



export default userRouter;
