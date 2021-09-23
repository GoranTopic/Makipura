import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import userModel from "../models/userModel.js"; // import user model

const LocalStrategy = passportLocal.Strategy ;

const passportConfig = "";

const customFields = {
		usernameField: "username",
		passwordField: "password"
}

const verifyCallback = (username, password, done) => {
		userModel.findOne({ username: username }).select("+password")
				.then( (user) => {
						if(user) bcrypt.compare(password, user.password, (error, same) =>{
								if(same){
										done(null, user); // password matched
								}else{ // if password does not match 
										done(null, false);
								}
						});
				}).catch(e => done(e)); //pass any errors to passport
}


const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
		done(null, user.id);
});

passport.deserializeUser((userId, done) => {
		userModel.findById(userId)
				.then((user) => { done(null, user); })
				.catch(err => done(err))
});

export default passport;

