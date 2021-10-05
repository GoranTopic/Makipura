/* this router is has the routes off all autorization user related routes */
import express from 'express' ;
import passport from "../auth/passport.js";
import { isAuthenticated, isNotAuthenticated } from "../auth/authentication.js";
import { isAuthorized } from "../auth/authorization.js";
import { signupUser, signinUser, signoutUser } from "../controllers/userControllers.js"

const emailVerficationRouter = express.Router(); // get express router

emailVerficationRouter.route('/confirmation')
		.post( // initiate the confirmation request
				//isAuthenticated,
		);

emailVerficationRouter.route('/send')
		.post(
				//isAuthenticated,
		);

export default emailVerfication;
