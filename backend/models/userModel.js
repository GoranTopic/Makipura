import mongoose from 'mongoose'; // import mongoose 
import uniqueValidator from 'mongoose-unique-validator';
import bcrypt from 'bcrypt';

const { Schema } = mongoose; // get the Schema obj from mongoose

const UserSchema = new Schema({ // create new Schma object
		username:{
				type: String,
				required: true,
		},
		password: {
				type: String,
				required: true,
				select: false,
		}
		email:{
				type: String,
				required: true,
				select: false,
				unique: true, 
		},
		image: {
				type: String,
		},
});

// use unquine validator
UserSchema.plugin(uniqueValidator);

// save hash the password before saving it 
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
