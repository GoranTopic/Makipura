/* this router is has the routes off all autorization user related routes */
import express from 'express' ;
import passport from "./passport.js";
import { isAuthenticated, isNotAuthenticated } from "./authentication.js";
import { isAuthorized } from "./authorization.js";
import { signupUser, signinUser, signoutUser } from "./controllers.js"
import { userValidators, updateUserValidators, validate } from '../users/validators.js';
import { cleanProperties } from '../users/utils.js';
import { multiFormHandler } from '../multi-form-parser/multer.js';

const authRouter = express.Router(); // get express router

authRouter.route('/signin')
		.post( 
				(req, res, next) => { console.log(req.body); next()},
				multiFormHandler,
				cleanProperties,
				// require user to log out before signing in
				isNotAuthenticated, 
				// passport handles sign in
				passport.authenticate('local'), 
				signinUser
		);

authRouter.route('/signup')
		.post(
				isNotAuthenticated, // if it is not logged it turn away
				cleanProperties,
				multiFormHandler,
				validate( userValidators ), // run validators
				signupUser
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

authRouter.route('/facebook')
		.get(
				passport.authenticate('facebook'),
		);

authRouter.route('/google/callback')
		.get( 
				passport.authenticate('google', { failureRedirect: '/login'  }),
				function(req, res) {
						console.log("Successfull login");
						res.status(200).json({ status: 'success' });
		});

authRouter.route('/facebook/callback')
		.get( 
				passport.authenticate('facebook', { failureRedirect: '/login'  }),
				function(req, res) {
						console.log(req)
						console.log("Successfull login");
						res.status(200).json({ status: 'success' });
		});


export default authRouter;
