import nodemailer from 'nodemailer';
import dotenv from "dotenv";
import userModel from "../users/models.js";
import tokenModel from "./models.js";
import { token_expiration_time, mail_sender } from "./config.js";

// run dot env to get enviroment variables
dotenv.config();
const env = process.env;

const createToken = (req, res, next) => {
		/* given the user object in the req. create a token for the user in the db
		 * if the gve token for a fiven user already exists, then update it the token */
		let userid = req.user._id;
		let filter = { userid: userid }
		let update = { userid: userid }
		// set options so that if token if not found it creates it with defaults
		let options = { upsert: true, new: true, setDefaultsOnInsert: true };
		tokenModel.findOneAndUpdate(filter, update, options, (error, token) => {
				if(error) res.status(500).json({
						status: "failure", 
						msg: error,
				});
				else{  
						if(token){ // was toeken was found
								req.token = token;
								next();
						}else res.status(404).json({ error: "token not found" });
				}
		});
}

const findToken = (req, res, next) => {
		/* check is a token is in the db token collection*/
		let token = req.body.token; // get token
		tokenModel.exists({ token }, 
				(error, result) => {  
						if(error) res.status(500).json({
								status: "failure", 
								msg: error,
						})
						else{  
								if(result){ // if token found in db, add to req 
										req.token = token;
										next();
								}else res.status(404).json({ error: "not found" });
						}
				}
		);
}

const emailExists = (req, res, next) => {
		/* check the database for the a passed email, 
		 * if found, attach to req, as req.email */
		let email = req.body.email; // get email
		userModel.exists({ email }, 
				(error, email) => {  
						if(error) res.status(500).json({
								status: "failure", 
								msg: error,
						})
						else{  
								if(email){ // if email found 
										req.email = email;
										next();
								}else res.status(404).json({ error: "not found" });
						}
				}
		);
}

const sendEmail = (req, res, next) => {
		/* With a given user in req which has been verified to have a email. 
		 * Send email with given token in req. */
		// add the exposed endpoint in a config file */
		let token = req.token;
		let recipentMail = req.user.email;
		let sender = mail_sender;
		let mailerOptions ={ // define options for the mailer
				from: sender,
				to: recipentMail,
				subject: "Password Recovery",
				html: `
				<p> you recovery code is ${token} </p>
				<p> use it to verify you email address. </p>
				<p> This code will expire in ${token_expiration_time} from ${token.createdAt} </p>
				`
		};
		// create a transport object
		var Transport = nodemailer.createTransport({
				service: "Gmail",
				auth:{
						user: env.EMAIL_SERVICE,
						pass: env.EMAIL_PASSWORD,
				}
		});
		// send mail
		Trasport.sendMail(mailerOptions, (error, response) => {
				if(error) res.status(500).json({
						status: "failure", 
						msg: error,
				})
				else res.status(200).json({ status:"success" }) // was able to send email
		});
}

const updatePassword = (req, res, next) => {
		/* this function takes a password passed, 
		 * and updates the user, with the user. */
		let password = req.password;
		let userid = req.user._id;
		userModel.findByIdAndUpdate(userid, { password }, (error, response) => {
				if(error) res.status(500).json({
						status: "failure", 
						msg: error,
				})
				else next() // pass to the next step
		});
}

const deleteToken = (req, res, next) => {
		let token_id = req.token._id;
		tokenModel.findByIdAndRemove(token_id, (error) => 	{
				if(error) res.status(500).json({ error }); // if there was an error
				else res.status(200).json({status: "success"}); // if if we where abe to delete
		});
}

export { createToken, findToken, emailExists, sendEmail, deleteToken, updatePassword };

