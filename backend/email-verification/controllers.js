import nodemailer from 'nodemailer';
import dotenv from "dotenv";
import userModel from "../models/userModel.js";
import tokenModel from "./tokenModel.js";
import {
		token_expiration_time, 
		router_endpoint, 
		confirm_endpoint, 
		mail_sender } from "./config.js";

// run dot env to get enviroment variables
dotenv.config();
const env = process.env;

const createToken = (req, res, next) => {
		/* given the user object in the req. create a token for the user in the db
		 * if the gve token for a fiven user already exists, then update it the token */
		let userid = req.user._id;
		let filter = { userid: userid  }
		let update = { userid: userid  }
		// set options so thath if token if not found it creates it with defaults
		let options = { upsert: true, new: true, setDefaultsOnInsert: true };
		tokenModel.findOneAndUpdate(filter, update, options, (error, token) => {
				if(error) res.status(500).json({
						status: "failure", 
						msg: error,
				})
				else{  
						if(token){ // was toeken was found
								req.token = token;
								next();
						}else res.status(404).json({ error: "token not found" });
				}
		});
}

const sendEmail = (req, res, next) => {
		/* With a given user in req which has been verified to have a email. 
		 * Send email with given token in req. */
		// add the exposed endpoint in a config file */
		let routerpath =  null // get it from the req
		let token = req.token;
		let recipentMail = req.user.email;
		let domain = env.API_ENDPOINT;
		let sender = mail_sender;
		let mailerOptions ={ // define options for the mailer
				from: sender,
				to: recipentMail,
				subject: "Email Confirmation",
				html: `
				Press <a href=${env.API_ENDPOINT}${router_endpoint}${confirm_endpoint}/${token.token}> 
				here 
				</a> to verify you email address.
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
		Trasport.sendMail(mailerOptions, (error, response)=>{
				if(error) res.status(500).json({
						status: "failure", 
						msg: error,
				})
				else res.status(200).json({ status:"success" }) // was able to send email
		});
}

const verifyUser = (req, res, next) => {
		// verifies an user, from a given user in 
		let userid= req.tokenUser._id;
		userModel.findOneAndUpdate({ userid }, { emailVerified: true }, (error, result) => {
				if(error) res.status(500).json({
						status: "failure", 
						msg: error,
				})
				else{  
						if(result) next(); // was toeken was found
						else res.status(404).json({ error: "user not found" });
				}
		});
}

const deleteToken = (req, res, next) => {
		let filter = { _id: req.token._id };
		postModel.findOneAndDelete(filter, (error) => 	{
				if(error) res.status(500).json({ error }); // if there was an error
				else res.status(200).json({status: "success"}); // if if we where abe to delete
		});
}

export { sendHomePagePosts, sendPosts, sendPost, createNewPost, updatePost, deletePost };

