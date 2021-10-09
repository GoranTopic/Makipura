import express from 'express' ;
import { isNotAuthenticated } from "../auth/authentication.js";
import { queryUserByToken, queryUserByEmail } from '../users/queries.js';
import { validateToken } from './validators.js';
import { createToken, findToken, emailExists, sendEmail, deleteToken, updatePassword } from "./controllers.js";

const passwordRecoveryRouter = express.Router(); // get express router

passwordRecoveryRouter.route('/email-recovery')
		.post( // initiate the confirmation request
				isNotAuthenticated, // make sure use is signed in
				emailExists, // find email
				queryUserByEmail, // query the user 
				createToken, // create token in db 
				sendEmail, // send email to user
		);

passwordRecoveryRouter.route('/confirmation')
		.post(
				isNotAuthenticated, // can only be access by unauthorized users
				validateToken, // check is token is valid format
				findToken, // check if token is in db
				queryUserByToken, // get the user who's token belong to
				updatePassword, // makr the usr as verfied
				deleteToken, // delete token
		);

export default passwordRecoveryRouter;
