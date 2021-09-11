import express from 'express' ;
import userController from '../controllers/userController.js';
import passport from "../config/passport.js";
import { isAuth, isNotAuth, isUserOwner } from "../middlewares/authMiddleware.js";
import { queryPostById, queryUserByUsername } from "../middlewares/queryMiddleware.js";

const userRouter = express.Router(); // get express router

userRouter.route('/signup')
		.post(
				userController.signup);

userRouter.route('/signin')
		.post( 
				isNotAuth, // require user to log out before signing in
				passport.authenticate('local'), 
				userController.signedIn);

userRouter.route('/signout')
		.post(isAuth, // can't sign out if user is not signed in
				userController.signout);

userRouter.route('/all/:page?')
		.get(userController.getAllUsers);

userRouter.route('/:username/')
		.get(queryUserByUsername, 
				userController.getUserByUsername)
		.put(queryUserByUsername,
				userController.updateUserByUsername)
		.delete(queryUserByUsername,
				userController.deleteUser)

userRouter.route('/whoami')
		.get(userController.whoAmI);



export default userRouter;
