import mongoose from 'mongoose'; // import mongoose 
import { genRandomCode } from './utils.js';
import { token_expiration_time } from './config.js';

const { Schema } = mongoose; // get the Schema obj from mongoose

const tokenSchema = new mongoose.Schema({
		userid: { 
				type: mongoose.Schema.Types.ObjectId, 
				required: true, 
				ref: 'User',
				unique: true,
		},
		token: { 
				type: String, 
				unique: true,
				required: true,
				default: function() { // create random uuid
						return genRandomCode();
				},
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
