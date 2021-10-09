import mongoose from 'mongoose'; // import mongoose 
import ImageSchema from '../images/schema.js';
//import { allowedCountries } from '../config.js';

const { Schema } = mongoose; // get the Schema obj from mongoose

const storeSchema = new Schema({ // create new Schma object
		title:{
				type: String,
				required: true,
		},
		description:{ 
				type: String,
				required: true,
		},
		location:{
				type: {
						type: String, 
						enum: ['Point'], // 'location.type' must be 'Point'
						required: true
				},
				coordinates: {
						type: [Number],
						required: true
				}
		},
		/*
		country:{
				type: String,
				enum: allowedCountries,
				required: true,
				state:{
						type: String,
						enum: countrie.states,
						required: true,
				},
		},
		*/
		ownerId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				required: true,
		},
		dateCreated: {
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
		storeBackgroundImage: {  
				type: Array,
				items: ImageSchema,
				required: true,
		},
		storeProfileImage: {  
				type: Array,
				items: ImageSchema,
				required: true,
		},
});

const storeModel = mongoose.model("Store", storeSchema);

export default  storeModel;
