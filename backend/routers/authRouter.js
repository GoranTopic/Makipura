/* this router is has the routes off all autorization user related routes */
import express from 'express' ;
import passport from "../auth/passport.js";
import { isAuthenticated, isNotAuthenticated } from "../auth/authentication.js";
import { isAuthorized } from "../auth/authorization.js";
import { signupUser, signinUser, signoutUser } from "../controllers/userControllers.js"
import { userValidators, updateUserValidators, validate } from '../validation/formValidation.js';
import { cleanProperties  } from '../utils/utils.js';
import { multiFormHandler  } from '../parsers/multer.js';

const authRouter = express.Router(); // get express router

authRouter.route('/signup')
		.post(
				isNotAuthenticated, // if it is not logged it turn away
				cleanProperties,
				multiFormHandler,
				validate( userValidators ), // run validators
				signupUser
		);

authRouter.route('/signin')
		.post( 
				multiFormHandler,
				cleanProperties,
				// require user to log out before signing in
				isNotAuthenticated, 
				// passport handles sign in
				passport.authenticate('local'), 
				signinUser
		);

authRouter.route('/signout')
		.post(
				multiFormHandler,
				// can't sign out if user is not signed in
				isAuthenticated, 
				// sign out user
				signoutUser
		);

authRouter.route('/google')
		.get(
				passport.authenticate('google', { 
						scope : ['https://www.googleapis.com/auth/plus.login'] 
				}),
		);

authRouter.route('/google/callback')
		.get( 
				passport.authenticate('google', { failureRedirect: '/login'  }),
				function(req, res) {
						console.log("Successfull login");
						res.status(200).json({ status: 'success' });
				  
		});

authRouter.route('/facebook')
		.get(
				passport.authenticate('facebook'),
		);

authRouter.route('/facebook/callback')
		.get( 
				passport.authenticate('facebook', { failureRedirect: '/login'  }),
				function(req, res) {
						console.log("Successfull login");
						res.status(200).json({ status: 'success' });
				  
		});


export default authRouter;
