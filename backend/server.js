import mongoose from 'mongoose';
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// import routers
import PostRouter from "./routers/postRouter.js";

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


		
		// define routes to use here
		server.use('/post/', PostRouter);
		// define routes for users,
		// define routes for converstion 
		// define routes for messages
		// define a global route thath catches any get requests
		server.use('*', (req,res) => { res.status(404).json({error: "not found"}); })


		try {
				// connect to database using moongose
				await mongoose.connect( DATABASE_URL + NAME_SPACE, 
						{ useNewUrlParser: true, useUnifiedTopology: true  } 
				);

				const testPost = { 
						title: "Post title",
						description: "this is description",
						price: 100,
						condition: "new",
						userid: "telix",
						images: "~/img/image.jpg",
				}

				//PostDAO.storePost(testPost);
				//PostDAO.getAllPosts().then( res => console.log(res) )


				server.listen(PORT, () => { // run app 
						console.log('server is running on port: ' + PORT);
				});
		} catch (e){
				console.error(e);
				process.exit(1);
		}
}

main().catch(console.error);
