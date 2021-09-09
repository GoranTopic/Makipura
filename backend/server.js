import mongoose from "mongoose";
import express from "express";
//import cookieParser from "cookie-parser";
import session from "express-session";
import MongoDBSession from "connect-mongodb-session";
import dotenv from "dotenv";
import cors from "cors";

// import routers
import postRouter from "./routers/postRouter.js";
import userRouter from "./routers/userRouter.js";


// 
const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/';
const NAME_SPACE = process.env.NAME_SPACE || 'makipura';

async function main() {
 		
		dotenv.config(); // run dot env to get enviroment variables

		// define middle ware to use in server
		const server = express(); //make instance of express server
		server.use(cors()); // use the middleware cors
		server.use(express.json()); // use json middleware 
		
		// connect the mongo connect with our session
		const mongoSession = MongoDBSession(session); 

		const mongoStore = new mongoSession({
				// define mongodb store
				uri:  DATABASE_URL + NAME_SPACE,
				collection: "sessions",
		});

		server.use(session({  // define value for the session 
				secret: 'Keyboard-cat',  
				name: "maki-cookie", 
				cookie : { maxAge: 300000 },
				resave: true, // for every reques to he server, resets the session cookie
				saveUninitialized: true, // Do not save the session after is has not been modified
				store: mongoStore,
		}));

		
		// define routes to use here
		server.use('/post/', postRouter);
		// define routes for users,
		server.use('/user/', userRouter);
		// define routes for converstion 
		// define routes for messages
		// define a global route thath catches any get requests
		server.use('*', (req,res) => { res.status(404).json({error: "not found"}); })


		try {
				// connect to database using moongose
				await mongoose.connect( DATABASE_URL + NAME_SPACE, 
						{ useNewUrlParser: true, useUnifiedTopology: true  } 
				);


				server.listen(PORT, console.log('server is running on port: ' + PORT));
		}catch (e){
				console.error(e);
				process.exit(1);
		}
}

main().catch(console.error);
