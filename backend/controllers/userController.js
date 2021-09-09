import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';

class userController {

		static async signup(req, res, next){
				let result;
				try{  
						result = await userModel.create(req.body);
						console.log(result);
						if(result) res.json(result);
						else res.status(404).json({ status: "could not create user" });
				}catch(e){ 
						console.error(`could not query home page posts ${e}`); 
						res.status(500).json({ error: e  });
				}
		}

		static async getUserById(req, res, next){
				let user;
				try{

				}catch(e){ 
						console.error(`could not ${e}`); 
						res.status(500).json({ error: e  });
				}
		}

		static async getAllUsers(req, res, next){
				let users;
				try{
						users = await userModel.find({});
						res.json(users);
				}catch(e){ 
						console.error(`could not query all posts: ${e}`); 
						res.status(500).json({ error: e  });
				}
		}

		static async signin(req, res, next){
				// get the username and password from the request
				const { username, password  } = req.body;
				userModel.findOne({ username: username  }, (error, user) =>{
						if(user){ // if the user if found in the db
								bcrypt.compare(password, user.password, (error, same) =>{
										if(same){
												// password is the same, store user session
												console.log(username + " has logged in");
												req.session.userId = user._id;
												res.redirect('/');
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

		static async logout(req, res, next){
				req.session.destroy( (err) =>{ 
						if(err){
								res.status(500).json({ error: "could not logout" });
						}else{
								res.status(200).json({ status: "success" });
								console.log("user logged out");
						}
				});
		}



}


export default userController;

