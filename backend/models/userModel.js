import mongoose from 'mongoose'; // import mongoose 
import bcrypt from 'bcrypt';

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
		image: {
				type: String,
		},
		admin:{
				type: Boolean,
				default: false,
		}
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
