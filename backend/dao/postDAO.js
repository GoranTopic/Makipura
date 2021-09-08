import mongoose from "mongoose";
import PostSchema from '../schemas/PostSchema.js'; // import post model

let postModel; // define post connection

class PostDAO {
	/* this is data object to access and interacet with teht moongose model */
		static async createModel(){
				if(postModel) return // if it is already defined then don't try to connect
				try{
						postModel = mongoose.model("Post", PostSchema);
				}catch(e){
						console.error(`unable to connect to postDAO: ${e}`);
				}
		}
		
		static async storePost(post){
				/* create a post in the db */
				postModel.create({
						title: post.title,
						descrition: post.descrition,
						price: post.price,
						condition: posts.condition,
						userid: post.userid,
						images: post.images,
				});
		}


		static async getAllPosts(){ 
				/* return all posts */
				return postModel.find({});
		}

}


export default PostDAO;


