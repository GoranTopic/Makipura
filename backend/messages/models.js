import mongoose from 'mongoose'; // import mongoose 

const messageSchema = new Schema({ // create new Schma object
		text:{
				type: String,
				required: true,
		},
		user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				required: true,
		},
		createdAt: {
				type: Date,
				default: new Date(),
		},
});

const  postModel = mongoose.model("Post", PostSchema);

export default  postModel;
