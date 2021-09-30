import mongoose from 'mongoose'; // import mongoose 
import bcrypt from 'bcrypt';
import ImageSchema from './imageSchema.js';
import { loginTypes } from '../config.js';

const { Schema } = mongoose; // get the Schema obj from mongoose

const UserSchema = new Schema({ // create new Schma object
		firstname:{
				type: String, 
				required: true, 
		},
		lastname:{
				type: String, 
				required: false, 
		},
		username:{
				type: String,
				required: true,
				unique: true, 
		},
		displayName:{
				type: String,
				required: true,
		},
		password: {
				type: String,
				//required: true,
				select: false,
		},
		email:{
				type: String,
				//required: true,
				unique: true, 
				select: false,
				sparse: true,
		},
		mobileNumber:{
				type: String,
				//required: true,
				unique: true, 
				select: false,
		},
		admin:{
				type: Boolean,
				default: false,
		},
		dateCreate: {
				type: Date,
				default: new Date(),
		},
		loginType:{
				type: String,
				enum: loginTypes,
				required: true, 
		},
		googleId: {
				type: String,
				index: { unique: true, sparse: true },
		},
		facebookId: {
				type: String,
				index: { unique: true, sparse: true },
		},
		locale: {
				type: String,
		},
		profileImage: ImageSchema,
});


// Hash the password before saving it 
// not do not forget not to chenge the passed callback function to
// an arrow function. if this is done then it will not work and 
// most likey promote insanity!
UserSchema.pre('save', function(next, somethingelse, other){
		const user = this;
		/* has password */
		if(user.loginType === 'local')
				bcrypt.hash(user.password, 10, (error, hash) => {  
						if(error) next(error) // if could not hash password
						else{ // eveything worked fine
								user.password = hash;
								next();
						}
				});
		// if it is note local, then no need to hash a password
		else next();
});

// Tag profile images with userid before saving
UserSchema.pre('save', function(next){
		const user = this;
		// has password 
		if(user.profileImage){ // if there is a profile passed
				user.profileImage.userid = user._id;
				next();
		}else next() // if none found exit
});

const  UserModel = mongoose.model("User", UserSchema);
console.log("User model made");

export default UserModel;
