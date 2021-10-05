import userModel from "../models/userModel.js";
import tokenModel  from "./models.js"

const hasEmail = (req, res, next) => {
		/* from a given user, in req, checks if the user has a email field*/ 
		let user = req.user;
		if(user.email) next(); // let the user pass
		else res.status(401).json({
				status: "failure", 
				msg: "user does not hae a email."
		});
}

export { hasEmail }

