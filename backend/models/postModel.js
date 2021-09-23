import mongoose from 'mongoose'; // import mongoose 
import { allowedCurrencies, allowedConditions } from '../config.js';

const { Schema } = mongoose; // get the Schema obj from mongoose


const ImageSchema = new Schema({ // schema for the images
		encoding:{
				type: String,
				required: true,
		},
		mimeType:{
				type: String,
				required: true,
		},
		filename:{
				type: String,
				required: true,
		},
		path:{
				type: String,
				required: true,
		},
		size:{
				type: String,
				required: true,
		},
		userid: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				required: true,
		},
})

const PostSchema = new Schema({ // create new Schma object
		title:{
				type: String,
				required: true,
		},
		description:{ 
				type: String,
				required: true,
		},
		currency:{
				type: String,
				enum: allowedCurrencies,
				required: true,
		},
		price:{
				type: Number,
				required: true,
		},
		condition:{ 
				type: String,
				enum: allowedConditions,
				required: true,
		},
		userid: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				required: true,
		},
		datePosted: {
				type: Date,
				default: new Date(),
		},
		views: {
				type: Number ,
				default: 0,
		},
		engagement: {
				type: Number ,
				default: 0,
		},
		images: {  
				type: Array,
				items: [ ImageSchema ],
				required: true,
		},
});

const  postModel = mongoose.model("Post", PostSchema);
console.log("post model made");

export default  postModel;
