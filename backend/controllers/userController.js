import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';

class userController {

		static async whoAmI(req, res, next){

		}

		static async getUserByUsername(req, res, next){
				let username = req.params.username ;
				let result;
				try{
						result = await userModel.findOne({ username }, "-_id");
						if(result) res.json(result);
						else res.status(404).json({ status: `could not find user: ${username}` });
				}catch(e){ 
						console.error(`could not ${e}`); 
						res.status(500).json({ error: e  });
				}
		}

		static async UpdateUserByUsername(req, res, next){
				let id = req.user._id;
				let result;
				try{
						result = await userModel.updateById(id);
						if(result) res.json(result);
						else res.status(404).json({ status: `could not find user: ${username}` });
				}catch(e){ 
						console.error(`could not ${e}`); 
						res.status(500).json({ error: e  });
				}
		}

		static async signup(req, res, next){
				let result;
				try{  
						result = await userModel.create(req.body);
						if(result){  
								console.log(res.session);
								res.json({ status: "success" });
						}
						else res.status(404).json({ status: "could not create user" });
				}catch(e){ 
						console.error(`could not query home page posts ${e}`); 
						res.status(500).json({ error: e  });
				}
		}

		static async signedIn(req, res, next){
				/* if th router got to here, 
				 * it means it got passed the passport middleware auth */
				// get the username and password from the request
				/* 
				const { username, email, password } = req.body;
				const filter = (username)?{ username: username }:{ email: email }
				console.log("session :");
				userModel.findOne( filter, (error, user) =>{
						if(user){ // if the user if found in the db
								bcrypt.compare(password, user.password, (error, same) =>{
										if(same){
												// password is the same, store user session
												console.log(user.username + " has logged in");
												req.session.userId = user._id;
												req.session.isAuth = true;
												res.status(200).json({ status: "success" });
										} else { // if the password hashs to the same
												console.log("passwords does not match");
												console.log(error);
												res.status(500).json({
														error: "Incorrect username or password" 
												});
										}
								});
						}else{ // if the use was not found
								console.log("no user: " + user + " found");
								console.log(error);
								res.status(500).json({ 
										error: "Incorrect username or password" 
								});
						}
				});
				*/
				res.status(200).json({ status: "success" });
		}

		static async signout(req, res, next){
				console.log(req.user);
				if(req.isAuthenticated()){// if user is loged in
						req.logout();
						req.session.destroy((error) => {
								if(error) res.status(500);
								else res.status(200).json({ status: "success" });
						});
				}else{ // if user is not logegd in
						res.status(401).json({ 
								status: "failure", 
								descriptrion: "User not logged in",  
						});
				}
		}

		static async getAllUsers(req, res, next){
				let users;
				try{
						users = await userModel.find({}).select('+password').select('+email');
						res.json(users);
				}catch(e){ 
						console.error(`could not query all posts: ${e}`); 
						res.status(500).json({ error: e  });
				}
		}

		
}


export default userController;

