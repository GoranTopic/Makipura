import express from 'express' ;
//import passport from "../auth/passport.js";
//import { isAuthorized } from "../auth/authorization.js";
//import { isAuthenticated, isNotAuthenticated } from "../auth/authentication.js";
//import { queryUserByUsername, queryUserByCookie } from "./queries.js";
//import { validate, userValidators, updateUserValidators } from './validators.js';
//import { cleanProperties } from './utils.js';
//import { sendUser, updateUser, deleteUser, 
//		sendAllUsers, searchUser  } from "./controllers.js"

const messagesRouter = express.Router(); // get express router



messagesRouter.route('/')
		.post( 
				
				(req,res) => {
						// now use socket.io in your routes file
						var io = req.app.get('socketio');
						io.emit('hi!');
						io.on('connection', () =>{
								console.log('a user is connected');
						})
				}

				/*
				(req, res) => {
							var message = new Message(req.body);
						message.save((err) =>{
										if(err)
													sendStatus(500);
										io.emit('message', req.body);
										res.sendStatus(200);
						})
				}
				*/
		)

messagesRouter.route('/user/:id/')
		.get()

messagesRouter.route('/:id')
		.delete()

export default messagesRouter;
