import mongoose from 'mongoose'; // import mongoose 
import bcrypt from 'bcrypt';
import ImageSchema from '../models/imageSchema.js';
import { loginTypes } from '../config.js';

const { Schema } = mongoose; // get the Schema obj from mongoose

const UserSchema = new Schema({ // create new Schma object
		firstname:{
				type: String, 
				required: false, 
		},
		lastname:{
				type: String, 
				required: false, 
		},
		username:{ 
				//username is out primary use idetifier, 
				//under no circustances it can be not unique
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
				sparse: true,
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
				unique: true, 
				sparse: true,
		},
		facebookId: {
				type: String,
				unique: true, 
				sparse: true,
		},
		locale: {
				type: String,
		},
		emailVerified:{
				type: Boolean,
				default: false,
		},
		phoneVerified:{
				type: Boolean,
				default: false,
		},
		isVerified:{
				type: Boolean,
				default: false,
		},
		profileImage: ImageSchema,
		backgroundImage: ImageSchema,

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


/* these functions could be merged */
// Tag profile images with userid before saving a new user
UserSchema.pre('save', function(next){
		const user = this;
		// has picture
		if(user.profileImage){ // if there is a profile passed
				user.profileImage.userid = user.username;
				next();
		}else next() // if none found exit
});


// Tag background images with userid before saving a new user
UserSchema.pre('save', function(next){
		const user = this;
		// has picture
		if(user.backgroundImage){ // if there is a backgroundImage passed
				user.backgroundImage.userid = user.username;
				next();
		}else next() // if none found exit
});

const  UserModel = mongoose.model("User", UserSchema);

export default UserModel;
