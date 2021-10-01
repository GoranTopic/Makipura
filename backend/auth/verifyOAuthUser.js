import userModel from "../models/userModel.js"; // import user model
import { haveSameData } from "../utils/utils.js"; 
/* this function is so bug it has a file a of its own, probly should take the creation of the user away and just leave the verification */

/* Callback for veryfing user on OAth */
const verifyOAuth = (company, userDataParser) => (accessToken, refreshToken, profile, done) => {
		/* recives a profile data, from the user and check it in the database,
		 * if not found create it, right? who knows... */
		// TODO: implement case where we are creating a user, but the username is alrady taken 
		// maybe append numbers of the googled id to the end of the username until it becomes unique?
		// or maybe use the googleId as the username? 
		// parse user info from the company
		let OAuthUser = userDataParser(profile);
		let filter;
		switch ( company ){
				case 'google':
						filter = { googleId: OAuthUser.googleId };
						break;
				case 'facebook':
						filter = { facebookId: OAuthUser.facebookId };
						break;
				default:
						console.error(`Could not parse data from compnay: ${company}`);
						return done( new Error(`Could not parse data from compnay: ${company}`), null);
		}
		// first we try to find the user with the given OAuth id belongs to
		userModel.findOne(filter, (error, user) =>{ 
				if(error) done(error, null); // if there was error
				if(user){ // if user was found
						if(haveSameData(OAuthUser, user))
								done(error, user) // sign in user
						else // if the information passed by the Oauth server does not match, update user
								userModel.findOneAndUpdate( filter, OAuthUser, (error, user)  => done(error, user) );
				}else // if user was not found, create it in the db
						userModel.create(OAuthUser, (error, user) => done(error, user));
		});
}


export default	verifyOAuth;
