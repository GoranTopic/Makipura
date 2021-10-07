import express from 'express' ;
import passport from "../auth/passport.js";
import { isAuthorized } from "../auth/authorization.js";
import { isAuthenticated, isNotAuthenticated } from "../auth/authentication.js";
import { queryPostById } from "../posts/queries.js";
import { queryUserByUsername, queryUserByCookie } from "./queries.js";
import { validate, userValidators, updateUserValidators } from './validators.js';
import { cleanProperties } from './utils.js';
import { sendUser, updateUser, deleteUser, 
		sendAllUsers, searchUser  } from "./controllers.js"

const userRouter = express.Router(); // get express router

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
