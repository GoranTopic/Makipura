import mongoose from 'mongoose'; // import mongoose 

const { Schema } = mongoose; // get the Schema obj from mongoose


const ImageSchema = new Schema({ // schema for the images
		encoding:{
				type: String,
		},
		mimeType:{
				type: String,
		},
		filename:{
				type: String,
		},
		path:{
				type: String,
				required: true,
		},
		size:{
				type: String,
		},
		userid: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				//required: true, // there is a problem when creating a user, 
				//how do we pass the userid of a user who is just being created? 
				//I tried to fix this with pre fuction in the schema
		},
})

export default ImageSchema;
