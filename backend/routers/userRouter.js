import express from 'express' ;
import userController from '../controllers/userController.js';
import passport from "../config/passport.js";
import { isAuth, isNotAuth, isUserOwner } from "../middlewares/authMiddleware.js";

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
		.get(userController.getUserByUsername)
		.put(userController.updateUserByUsername)
		.delete(userController.deleteUserByUsername)

userRouter.route('/whoami')
		.get(userController.whoAmI);



export default userRouter;
