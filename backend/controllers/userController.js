import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';

class userController {

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

		static async signin(req, res, next){
				// get the username and password from the request
				const { username, email, password  } = req.body;
				const filter = (username)?{ username: username }:{ email: email }
				req.session.Auth = true;
				console.log(req.session.userId);
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
		}

		static async signout(req, res, next){
				req.session.destroy( (err) =>{ 
						if(err){
								res.status(500).json({ error: "could not logout" });
						}else{
								res.status(200).json({ status: "success" });
								console.log("user logged out");
						}
				});
		}

		static async getAllUsers(req, res, next){
				let users;
				try{
						users = await userModel.find({}).select('-password').select('-email');
						res.json(users);
				}catch(e){ 
						console.error(`could not query all posts: ${e}`); 
						res.status(500).json({ error: e  });
				}
		}

		static async getUserByUserName(req, res, next){
				let username;
				let fetched_user;
				try{
						username = req.body.username;
						fetched_user = await userModel.find({ username: username });
						if(fetched_user) res.json(fetched_user);
						else res.status(404).json({ status: `could not find user: ${username}` });
				}catch(e){ 
						console.error(`could not ${e}`); 
						res.status(500).json({ error: e  });
				}
		}

}


export default userController;

