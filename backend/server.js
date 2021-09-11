import mongoose from "mongoose";
import express from "express";
//import cookieParser from "cookie-parser";
import session from "express-session";
import MongoDBSession from "connect-mongodb-session";
import dotenv from "dotenv";
import cors from "cors";

// import configured passport 
import passport from "./config/passport.js";

// import routers
import postRouter from "./routers/postRouter.js";
import userRouter from "./routers/userRouter.js";

// import custom middleware
//import { noCUDIfUnauthenticated } from "./middlewares/authMiddleware.js"

async function main() {

		dotenv.config(); // run dot env to get enviroment variables

		//  enviromental variables
		const PORT = process.env.PORT;
		const DATABASE_URL = process.env.DATABASE_URL;
		const NAME_SPACE = process.env.NAME_SPACE;
		const SECRET = process.env.SECRET;

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

		// Server add middle ware session 
		server.use(session({  // define value for the session 
				secret: 'Keyboard-cat',  
				name: "maki-cookie", 
				cookie : { 
						// millisecons * second in a minute * minutes in an hour * hours in a day 
						maxAge: 1000 * 60 * 60 * 24 
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
		server.use('/user/', userRouter);
		// define routes for converstion 
		// define routes for messages
		// define a global route thath catches any get requests
		server.use('*', (req,res) => { res.status(404).json({error: "not found"}); })



		server.listen(PORT, console.log('server is running on port: ' + PORT));
}

main().catch(console.error);
