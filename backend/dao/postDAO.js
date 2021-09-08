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

		static async store(post){
				/* create a post in the db */
				let newPost;
				let respons;
				try {  
						newPost = {
								title: post.title,
								description: post.description,
								price: post.price,
								condition: post.condition,
								userid: post.userid,
								images: post.images,
								views: 0,
								engagement: 0, }
						response = await postModel.create(newPost);
						if(response) return response;
						else return false;
				}catch(e){ console.error(e); return false; }
		}

		static async getAll(numbers, page){ 
				/* return all posts */
				let response;
				try{  // read some where thath skip does not scale
						//response = postModel.find().skip(page * numbers).limit(number);
						response = await postModel.find({});
						if(response) return response;
						else return false;
				}catch(e){ console.error(e); return false; }
		}
	

		static async findById(id){
				let response;
				try{  
						response = await postModel.findById(id);
						if(response) return response;
						else return false;
				}catch(e){ console.error(e); return false; }
		}

		static async updateById(id, post){
				let response;
				try{  
						response = await postModel.findByIdAndUpdate(id, post);
						if(response) return response;
						else return false;
				}catch(e){ console.error(e); return false; }
		}


		static async deleteById(id){
				let response;
				try{  
						response = await postModel.findByIdAndDelete(id);
						if(response) return response;
						else return false;
				}catch(e){ console.error(e); return false; }
		}
}


export default PostDAO;


