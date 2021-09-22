import mongoose from 'mongoose'; // import mongoose 
import bcrypt from 'bcrypt';

const { Schema } = mongoose; // get the Schema obj from mongoose

const ImageSchema = new Schema({ // schema for the images
		type: String,
		userid: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				required: true,
		},
})

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
		password: {
				type: String,
				required: true,
				select: false,
		},
		email:{
				type: String,
				required: true,
				unique: true, 
				select: false,
		},
		mobileNumber:{
				type: String,
				required: true,
				unique: true, 
				select: false,
		},
		images: [ImageSchema],
		admin:{
				type: Boolean,
				default: false,
		},
		dateCreate: {
				type: Date,
				default: new Date(),
		},
});

// Hash the password before saving it 
UserSchema.pre('save', function(next){
		const user = this;
		bcrypt.hash(user.password, 10, (error, hash) => {  
				console.log(error);
				user.password = hash;
				next();
		});
});

const  UserModel = mongoose.model("User", UserSchema);
console.log("User model made");

export default UserModel;
