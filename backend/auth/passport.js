import dotenv from "dotenv";
import passport from 'passport';
import passportLocal from 'passport-local';
import passportGoogleOAth from 'passport-google-oauth';
import passportFacebookOAth from 'passport-facebook';
import bcrypt from 'bcrypt';
import userModel from "../users/models.js"; // import user model
import verifyOAuth from "./verifyOAuthUser.js";

// get eviroment  variables
dotenv.config();
const ENV = process.env;

// local strategy fro storing password
const LocalStrategy = passportLocal.Strategy ;

// global config for passport
const passportConfig = "";

const customFields = {
		usernameField: "username",
		passwordField: "password"
}

const verifyLocalCallback = (username, password, done) => 
		/* this function that check is the passwod is true*/
		userModel.findOne({ username: username }).select("+password")
				.then( (user) => {
						if(user)  
								bcrypt.compare(password, user.password, (error, same) =>{
										if(same) done(null, user); // password matched
										else done(null, false); // if password does not match 
								});
						else done(null, false);
				}).catch(e => done(e)); //pass any errors to passport


// create a new local strategy intance, with the fileds and verify callback
const localStrategy = new LocalStrategy(customFields, verifyLocalCallback);

passport.serializeUser((user, done) => {
		/* serilize user to the session, only pass the id, to the session
				* instead of the whole object*/
		done(null, user.id); 
});

passport.deserializeUser((userId, done) => 
		/* query the databse for the id in the session
		* and query the databse for the user info to populate req.user */
		userModel.findById(userId)
				.then((user) => { done(null, user); })
				.catch(err => done(err))
);

// use the local stategy in the passport
passport.use('local', localStrategy);

/* ------------- google OAuth strategy ----------- */

const GoogleStrategy = passportGoogleOAth.OAuth2Strategy;

const googleClientData = {
		/* this is obj contains the data for the client who is
		* trying to comunicate with the OAuth google server */
		clientID: ENV.GOOGLE_OATH_CLIENT_ID,
		clientSecret: ENV.GOOGLE_OATH_CLIENT_SECRET,
		callbackURL: "http://localhost:5000/auth/google/callback",
}

const parseGoogleUserData = (profile) => {
		return {
				googleId: profile.id,
				username: "g-" + profile.id, // usename must be a unique string, 
				displayName: profile.displayName,
				firstname: profile.name.givenName,
				lastname: profile.name.familyName,
				// this is avoid making a empty image obj in the db, if a image has not been passed
				profileImage: profile._json.picture? 
					{ path: profile._json.picture } : undefined,
				backgroundImage: profile._json.background? 
					{ path: profile._json.background } : undefined,
				locale: profile._json.locale,
				loginType: 'google',
		} 
}

// create a call back function 
const verifyGoogleUser = verifyOAuth('google', parseGoogleUserData);

//create a Google strategy instance
const googleStrategy = new GoogleStrategy(googleClientData, verifyGoogleUser);

// use the the google OAuth in passport
passport.use('google', googleStrategy);


/* ------------- facebook OAuth strategy ----------- */

const FacebookStrategy = passportFacebookOAth.Strategy;

const facebookClientData = {
		/* this is obj contains the data for the client who is
		* trying to comunicate with the OAuth facebook server */
    clientID: ENV.FACEBOOK_OATH_CLIENT_ID,
    clientSecret: ENV.FACEBOOK_OATH_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/facebook/callback"
  }

const parseFacebookUserData = (profile) => {
		return { // do for facebook
				facebookid: profile.id,
				username: "fb-" + profile.id, // usename must be a unique string, 
				displayName: profile.displayName,
				firstname: profile.name.givenName,
				lastname: profile.name.familyName,
				// this is avoid making a empty image obj in the db, if a image has not been passed
				profileImage: profile._json.picture? 
					{ path: profile._json.picture } : undefined,
				backgroundImage: profile._json.background? 
					{ path: profile._json.background } : undefined,
				loginType: 'facebook',
		} 
}

// make verify user function
const verifyFabookUser = verifyOAuth('facebook', parseFacebookUserData);

//create a facebook strategy instance
const facebookStrategy = new FacebookStrategy(facebookClientData, verifyFabookUser);

// use the the facebook OAuth in passport
passport.use('facebook', facebookStrategy);

export default passport;

