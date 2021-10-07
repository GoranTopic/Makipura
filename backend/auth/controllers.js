
const signupUser = (req, res, next) => {
		/* create user in the db */
		let user = { ...req.body, 
				displayName: req.body.firstname + " " + req.body.lastname, 
				loginType: 'local',
				profileImage: req.files.profileImage? //if image has been passed
				req.files.profileImage[0] : undefined,
				backgroundImage: req.files.backgroundImage? 
				req.files.backgroundImage[0] : undefined,
		}
		userModel.create(user, (error, user) => {
				if(error) res.status(500).json({ error: error }); // delete for production
				else res.json({ status: "success" });
		});
}

const signinUser = (req, res, next) => {
		/* left authetification up to passport */
		res.status(200).json({ status: "success" });
}

const signoutUser = (req, res, next) => {
		req.logout(); // call logout from passport
		req.session.destroy((error) => { // destroy session
				if(error) res.status(500);
				else res.status(200).json({ status: "success" });
		});
}

export { signupUser, signinUser, signoutUser }
