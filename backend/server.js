import mongoose from 'mongoose';
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// import data access objects to create connection with mondb
// import the post Data Access Object 
import PostDAO from "./dao/postDAO.js"; 
// import user data access object
//import UserDAO from "./data_access_objecs/userDAO.js"; 
// import conversation dao
//import ConversationDAO from "./data_access_objecs/conversationDAO.js"; 
// import messageDAO
//import MessageDAO from "./data_access_objecs/messageDAO.js"; 


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
		// define routes for posts,
		// define routes for users,
		// define routes for converstion 
		// define routes for messages


		try {
				// connect to database using moongose
				await mongoose.connect( DATABASE_URL + NAME_SPACE, 
						{ useNewUrlParser: true, useUnifiedTopology: true  } 
				);
				PostDAO.createModel(); // create model
			

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
