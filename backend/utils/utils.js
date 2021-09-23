import userModel from "../models/userModel.js";

import { allowedPropertiesInRequest } from "./config.js";

const allowedProperties = allowedPropertiesInRequest;
/* this imported list must be of the form of:
 * {
 * 		username: true,
 *		lastname: true,
 *		firstname: true,
 *		condition: true,
 *		description: true,
 *		title: true,
 *		price: true,
 *		currency: true,
 *		image: true,
 *		images: true,
 *		password: true,
 *		email: true,
 *} */


const cleanProperties = (req, res, next) => {
		/* clean the json of any unwanted properties */
		const clean_json = {}
		Object.keys(req.body).forEach(
				property => // for property
				allowedProperties[property] &&  // if is make as acceptable
				(clean_json[property] = req.body[property]) // pass to new obj
		);
		req.body = clean_json;
		next();
}

export { cleanProperties };
