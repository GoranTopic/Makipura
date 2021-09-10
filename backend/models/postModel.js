import mongoose from 'mongoose'; // import mongoose 
const { Schema } = mongoose; // get the Schema obj from mongoose

const PostSchema = new Schema({ // create new Schma object
		title:{
				type: String,
				required: true,
		},
		description:{ 
				type: String,
				required: true,
		},
		price:{
				type: Number,
				required: true,
		},
		condition:{ 
				type: String,
				enum: [ "brand new", "new", "slightly used", "used", "worn", "damaged" ],
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
				items: {
						type: String,
				},
				required: true,
		},
});

const  postModel = mongoose.model("Post", PostSchema);
console.log("post model made");

export default  postModel;
