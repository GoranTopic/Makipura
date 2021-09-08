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
				enum: [ "brand new", "slightly used", "used", "worn", "damaged" ],
				required: true,
		},
		userid: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				required: true,
		},
		datePosted:{
				type: Date,
				default: new Date(),
		},
		images: {
				type: Array,
				items: {
						type: String,
				},
				required: true,
		},
});

export default  PostSchema;
