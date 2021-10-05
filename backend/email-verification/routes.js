import express from 'express' ;
import { isAuthenticated } from "../auth/authentication.js";
import { hasEmail } from "./middlewares.js"
import { createToken, findToken, sendEmail, verifyUser, deleteToken } from "./controllers.js";
import { validateToken } from './validators.js';
import { queryUserByToken } from './queries.js';

const emailVerficationRouter = express.Router(); // get express router

emailVerficationRouter.route('/confirmation')
		.post( // initiate the confirmation request
				isAuthenticated, // make sure use is signed in
				hasEmail, // make sure user has a email
				createToken, // create token in db 
				sendEmail, // send email to user
		);

emailVerficationRouter.route('/send')
		.post(
				//isAuthenticated,
				validateToken, // check is token is valid format
				findToken, // check if token is in db
				queryUserByToken, // get the user who's token belong to
				verifyUser, // makr the usr as verfied
				deleteToken, // delete token
		);

export default emailVerficationRouter;
