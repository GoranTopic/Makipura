import mongoose from "mongoose";
import express from "express";
import session from "express-session";
import MongoDBSession from "connect-mongodb-session";
import dotenv from "dotenv";
import cors from "cors";
import path from 'path';
import { Server } from 'socket.io';
import https from 'https';
import { createServer } from 'http';
import fs from 'fs';

// import configured passport 
import passport from "./auth/passport.js";

// import socket io inicilizer
import initializeSocket from './messages/initializeSocket.js';

// import routers
import userRouter from "./users/router.js";
import postRouter from "./posts/router.js";
import storeRouter from "./stores/router.js";
import authRouter from "./auth/router.js";
import paymentRouter from "./payment/router.js";
import emailVerificationRouter from "./email-verification/router.js";
import passwordRecoveryRouter from "./password-recovery/router.js";
import messagesRouter from "./messages/router.js";

// run dot env to get enviroment variables
dotenv.config();
const ENV = process.env;

//  enviromental variables
const DATABASE_URL = ENV.DATABASE_URL;
const NAME_SPACE = ENV.NAME_SPACE;
const SECRET = ENV.SECRET;
const PORT = process.env.PORT;

// define middle ware to use in server
const server = express(); //make instance of express server
server.use(cors()); // use the middleware cors
// server static file in the public directory
server.use(express.json({ limit:'10kb' })); // use json middleware 
server.use('/public', express.static(path.join('/home/telix/Makipura/backend', 'public')));
//server.use(express.urlencoded());

// connect the mongo connect with our session
const mongoSession = MongoDBSession(session); 

const mongoStore = new mongoSession({
		// define mongodb store
		uri:  DATABASE_URL + NAME_SPACE,
		collection: "sessions",
});

// Server add middleware session 
server.use(session({  // define value for the session 
		secret: ENV.MIDDELWARE_SECRET,  
		name: ENV.COOKIE_NAME, 
		cookie : { 
				// millisecons * second in a minute * minutes in an hour * hours in a day 
				maxAge: 1000   * 60                 * 60                 * 24 
		},
		resave: true, // for every reques to he server, resets the session cookie
		saveUninitialized: false, // Do not save the session after is has not been modified
		store: mongoStore,
}));

try {
		// connect to database using moongose
		await mongoose.connect( DATABASE_URL + NAME_SPACE, 
				{ useNewUrlParser: true, useUnifiedTopology: true  } );
}catch (e){
		console.error(e);
		process.exit(1);
}


// initialize https server 
// read cert keys files
const credentials = {
		key: fs.readFileSync('key.pem'),
		cert: fs.readFileSync('cert.pem')
};
// create https server
const httpServer = createServer(credentials, server);

// initialize socket io 
const io = new Server(httpServer, { 
		cors: {
				origin: "http://localhost:8080", 
		}, 
} );

// register all of the events in the socket io 
// that are necesary for messaging
initializeSocket(io);

// inizilized password autheticifcation middleware
server.use(passport.initialize());
server.use(passport.session());

// Define Routes here
// define routes for users,
server.use('/user', userRouter);
// define routes to stores here
server.use('/store', storeRouter);
// define routes to posts here
server.use('/post', postRouter);
// defined routes for authorization
server.use('/auth', authRouter);
// define routes for payment 
server.use('/payment', paymentRouter);
// route for message 
//server.use('/messages', messagesRouter);
// recover password
server.use('/recovery', passwordRecoveryRouter);
// emai verification 
server.use('/email-verification', passwordRecoveryRouter);
// define routes for converstion 
// define routes for messages
// define a global route thath catches any get requests
server.use('*', (req,res) => { res.status(404).json({error: "not found"}); })

httpServer.listen(PORT, 
		console.log('http server listen on https://localhost:' + PORT)
);

export default server;

