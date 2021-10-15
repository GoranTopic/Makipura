import express from 'express' ;
import userModel from '../users/models.js';

//import passport from "../auth/passport.js";
//import { isAuthorized } from "../auth/authorization.js";
//import { isAuthenticated, isNotAuthenticated } from "../auth/authentication.js";
//import { queryUserByUsername, queryUserByCookie } from "./queries.js";
//import { validate, userValidators, updateUserValidators } from './validators.js';
//import { cleanProperties } from './utils.js';
//import { sendUser, updateUser, deleteUser, 
//		sendAllUsers, searchUser  } from "./controllers.js"

const messagesRouter = express.Router(); // get express router


const querSocketUserbyCookie = async cookie => 
		await userModel.findById(userId)
				.then(user => user)
				.catch(err => err)



messagesRouter.route('/')
		.post( 
				// is authentificated
				// get user by cookie
				// is authorized
				// authorize to recive the message
				// recive message from user and send message to the other user
				// save the message in the database
				(req,res) => {
						console.log("function post ran")
						// now use socket.io in your routes file
						var io = req.app.get('socketio');
						/*
						io.use((socket, next) => { // make middleware
								const cookie = socket.handshake.auth.cookie;
								const userid = socket.handshake.auth.userid;
								const user = querSocketUserbyCookie(userid);
								if(user){
										socket.user = user;
										next();
								}else{
										return nex(new Error("invalid username"));
								}
						});
						*/
						io.emit('hi!');
						io.on("connection", socket => { 
								console.log("there was a connection");
								socket.emit("chat-message",  "helloword");
								const users = [];  
								for (let [id, socket] of io.of("/").sockets) {    
										users.push({      
												userID: id,      
												username: socket.username,    
										});  
								}  
								socket.emit("users", users);
						});
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
				// is authentificated
				// get user by cookie
				// is authorized
				// authorize to recive the message
				// send messages to user from a given id if it has the 

messagesRouter.route('/:id')
		.delete()
				// is authentificated
				// get user by cookie
				// is authorized
				// authorize to recive the message
				// send messages to user from a given id if it has the 

export default messagesRouter;
