import mongoose from 'mongoose'; // import mongoose 
import { v4 as uuid } from 'uuid';
import { token_expiration_time } from './config.js';

const { Schema } = mongoose; // get the Schema obj from mongoose

const tokenSchema = new mongoose.Schema({
		userid: { 
				type: mongoose.Schema.Types.ObjectId, 
				required: true, 
				ref: 'User'  
				unique: true,
		},
		token: { 
				type: String, 
				required: true  
				unique: true,
				default: function() { // create random uuid
						return uuid();
				}
		},
		createdAt: { 
				type: Date, 
				required: true, 
				default: Date.now, 
				expires: token_expiration_time,
		}
});

const tokenModel = mongoose.model("emailVerificationToken", tokenSchema);

export default tokenModel;
