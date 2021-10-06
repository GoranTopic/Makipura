import mongoose from "mongoose";
import express from "express";
import session from "express-session";
import MongoDBSession from "connect-mongodb-session";
import dotenv from "dotenv";
import cors from "cors";
import path from 'path';

// import configured passport 
import passport from "./auth/passport.js";

// import routers
import postRouter from "./routers/postRouter.js";
import userRouter from "./routers/userRouter.js";
import authRouter from "./routers/authRouter.js";
import paymentRouter from "./routers/paymentRouter.js";
import emailVerificationRouter from "./email-verification/routes.js"

// run dot env to get enviroment variables
dotenv.config();
const ENV = process.env;

//  enviromental variables
const DATABASE_URL = ENV.DATABASE_URL;
const NAME_SPACE = ENV.NAME_SPACE;
const SECRET = ENV.SECRET;

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
		name: "maki-cookie", 
		cookie : { 
				// millisecons * second in a minute * minutes in an hour * hours in a day 
				maxAge: 1000   * 60                 * 60                 * 24 
		},
		resave: true, // for every reques to he server, resets the session cookie
		saveUninitialized: true, // Do not save the session after is has not been modified
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

server.use(passport.initialize());
server.use(passport.session());

// define routes to use here
server.use('/post/', postRouter);
// define routes for users,
server.use('/user', userRouter);
// defined routes for authorization
server.use('/auth', authRouter);
// define routes for payment 
server.use('/payment', paymentRouter);
// define routes for converstion 
// define routes for messages
// define a global route thath catches any get requests
server.use('*', (req,res) => { res.status(404).json({error: "not found"}); })

export default server

