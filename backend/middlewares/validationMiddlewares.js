import { body, checkSchema, validationResult } from 'express-validator';
import { blockedUsernames, phoneNumbersLocales, conditionsList } from "../config/emunsAndLists.js";
import postModel from '../models/postModel.js'
import userModel from '../models/userModel.js'


const titleValidation = () => {
		let notEmptyOptions = {
				errorMessage: "post most have a title", 
		}
		let lengthOptions = {
				options: { min: 5, max: 50, },
				errorMessage: "title most be between 5 and 50 characters",
		}
		let matchOptions = {
				options: [/^[a-zA-Z0-9_ ]*$/],
				errorMessage: 'title can contain only letters and numbers or underscore',
		}
		let trimOptions ={ 
				options: [' ',], 
		}
		return body('title')
				.notEmpty(notEmptyOptions)
				.isLength(lengthOptions)
				.matches(matchOptions)
}

const descriptionValidation = () => {
		let notEmptyOptions = {
				errorMessage: "post most have a title", 
		}
		let lengthOptions = {
				options: { min: 5, max: 500, },
				errorMessage: "description most be between 5 and 500 characters",
		}
		let matchOptions ={
				options: [/^[a-zA-Z0-9_\-\!\?\(\)\&\%\.\,\+\=áéíóúüñ¿¡ ]*$/],
				errorMessage: 'description can contain only letters and numbers or underscore',
		}
		let trimOptions = { options: [' ',] }
		return body('description').notEmpty(notEmptyOptions);
}


const userValidators = [
		titleValidation(),
		descriptionValidation(),
]



const validate = validations => 
		async (req, res, next) => {
				validations.every( async validation => {
						let result = await validation.run(req);
						return result.errors.length;
				});
				const errors = validationResult(req);
				if (errors.isEmpty()) {
						console.log("no errors")
						return next();
				}else{
						console.log("with errors");
						res.status(400).json({ errors: errors.array() });
				} 
		};




const postValidationSchema = {
		title: {
				notEmpty: { errorMessage: "post most have a title", }, 
				matches: {
						options: [/^[a-zA-Z0-9_ ]*$/],
						errorMessage: 'title can contain only letters and numbers or underscore',
				},
				isLength: { 
						options: { min: 5, max: 50, },
						errorMessage: "title most be between 5 and 50 characters",
				},
				errorMessage: "invaid title",
				trim: { options: [' ',] },
		}, 
		description: {
				notEmpty: { errorMessage: "Must have a description", },
				matches: {
						options: [/^[a-zA-Z0-9_\-\!\?\(\)\&\%\.\,\+\=áéíóúüñ¿¡ ]*$/], // test this
						errorMessage: 'title can contain only letters and numbers or underscore',
				},
				isLength: { 
						options: { min: 5, max: 500, },
						errorMessage: "description most be between 5 and 500 characters",
				},
				errorMessage: "invalid description",
				trim: { options: [' ',] },
		}, 
		currency:{
				notEmpty: { errorMessage: "Must have a price", },
				matches: {
						options: [/^[A-Z]*$/],
						errorMessage: 'Currency code must contail only capial letters',
				},
				isLength:{
						options: { min: 3, max: 3 },
						errorMessage: 'currecy code must be 3 digits long',
				},
				errorMessage: "invalid currency",
		},
		price: {
				notEmpty: { errorMessage: "Must have a price", }, 
				isLength:{
						options: { max: 6 },
						errorMessage: 'price code must be 6 digits long',
				},
				isCurrency:{
						options:{  
								require_symbol: false, 
								allow_space_after_symbol: false, 
								symbol_after_digits: false, 
								allow_negatives: false, 
								parens_for_negatives: false, 
								allow_negative_sign_placeholder: false, 
								thousands_separator: ',', 
								decimal_separator: '.', 
								allow_decimal: true, 
								digits_after_decimal: [2], 
								allow_space_after_digits: false,
						},
						errorMessage: "Cannot be negative",
				},
				trim: { options: [' ',] },
		},
		condition:{
				notEmpty: { errorMessage: "Must have a condition", },
				matches:{ options: [conditionsList.join("|")], },
				errorMessage: "Conditions must match one of the following: " + conditionsList,
		},
}

const userValidationSchema = {
		username: {
				notEmpty: { errorMessage: "must have username", },
				custom: {  
						options: (username, params) => {
								let resource = params.req.resource;
								/* if resource is defined, it means this is an update, 
								 * in which case we must not check for duplictes of unique properties 
								 * only if they are the same. */
								if(resource) if(resource.username === username ) return true;
								// continue checking if it is one of the blocked usernames 
								let isNotBlocked = blockedUsernames.every( 
										// check is the given user name is equal to 
										blocked => blocked.normalize() !== username.normalize());
								if(isNotBlocked){ // if username was not blocked, check is it duplicate
										return userModel.find({ username })
												.then( username => { 
														if (username.length > 0) 
																return Promise.reject('Username already in use');
												});
								}else return Promise.reject('That Username cannot be used');
						},
				},
				matches: {
						options: [/^[a-zA-Z0-9_\-áéíóúüñ]*$/], // test this
						errorMessage: 'username can contain only letters and numbers or underscore',
				},
				trim: { options: [' ',] },
		}, 
		firstname: {
				notEmpty: { errorMessage: "Must have a fristname", },
				isLength: { 
						min: 3, 
						max: 50,
						errorMessage: "must be between 3 to 50 ",
				},
				matches: {
						options: [/^[a-zA-Z0-9_\-áéíóúüñ ]*$/], // test this
						errorMessage: 'firstname has unsuported characters',
				},
				errorMessage: "invalid firstname",
				trim: { options: [' ',] },
		}, 
		lastname: {
				isLength: { 
						min: 0, 
						max: 50,
						errorMessage: "must be between 3 to 50 ",
				},
				matches: {
						options: [/^[a-zA-Z0-9_\-áéíóúüñ ]*$/], // test this
						errorMessage: 'lastname has unsuported characters',
				},
				errorMessage: "invalid lastname",
				trim: { options: [' ',] },
		},
		email:{
				isEmail: {
						options:{
								allow_display_name: false,
								require_display_name: false,
								allow_utf8_local_part: true,
								require_tld: true,
								allow_ip_domain: false,
								domain_specific_validation: false,
								ignore_max_length: true,
								blacklisted_chars: ' ',
						},
						errorMessage: 'is not ainvalid email address',
				},
				isLength: {  
						max: 100,
						errorMessage: 'email must be less than 60 characters long',
				},
				normalizeEmail:{
						options:{
								all_lowercase: true,
								gmail_lowercase: true,
								gmail_remove_dots: false,
								gmail_remove_subaddress: true,
								gmail_convert_googlemaildotcom: true,
								outlookdotcom_lowercase: true,
								yahoo_lowercase: true,
								yahoo_remove_subaddress: true,
								icloud_lowercase: true,
								icloud_remove_subaddress: true,
						},
					
				},
				custom: { // check that there are no duplicates
						options: (mobileNumber, params) => {  // must run after normalization
								let resource = params.req.resource;
								/* Like in the username, if in the update request
								 * the mobileNumber is not being changed
								 * we allow the request to continue */
								if(resource) if(resource.mobileNumber == mobileNumber) return true;
								// continue checking if the new phone number is not in the db 
								userModel.find({ mobileNumber }).then(
										users => { 
												if (users.length > 0) 
														return Promise.reject('Phone number already in use')
										})
						}
				},
				errorMessage: 'invalid email',
		},
		mobileNumber:{
				isMobilePhone:{ 
						options: [ phoneNumbersLocales ], 
				},
				custom: { // check that there are no duplicates
						options: (email, params) => {  // must run after normalization
								let resource = params.req.resource;
								/* Like in the username, if in the update request
								 * the email is not being changed
								 * we allow the request to continue */
								if(resource) if(resource.email === email) return true;
								// continue checking if the new email is not in the db 
								userModel.find({ email }).then(
										users => { 
												if (users.length > 0) 
														return Promise.reject('Email already in use')
										})
						}
				},
		},
		password:{
				isStrongPassword:{
						options:{  
								minLength: 8, 
								minLowercase: 1, 
								minUppercase: 1, 
								minNumbers: 1, 
								minSymbols: 0,
								returnScore: false, 
								pointsPerUnique: 1, 
								pointsPerRepeat: 0.5, 
								pointsForContainingLower: 10, 
								pointsForContainingUpper: 10, 
								pointsForContainingNumber: 10, 
								pointsForContainingSymbol: 10,
						},
						errorMessage: "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number",
				}
		},
}


const updateUserValidationSchema = {
		username: {
				custom: {  
						options: (username, params) => {
								let resource = params.req.resource;
								/* if resource is defined, it means this is an update, 
								 * in which case we must not check for duplictes of unique properties 
								 * only if they are the same. */
								if(resource) if(resource.username === username ) return true;
								// continue checking if it is one of the blocked usernames 
								let isNotBlocked = blockedUsernames.every( 
										// check is the given user name is equal to 
										blocked => blocked.normalize() !== username.normalize());
								if(isNotBlocked){ // if username was not blocked, check is it duplicate
										return userModel.find({ username })
												.then( username => { 
														if (username.length > 0) 
																return Promise.reject('Username already in use');
												});
								}else return Promise.reject('That Username cannot be used');
						},
				},
				matches: {
						options: [/^[a-zA-Z0-9_\-áéíóúüñ]*$/], // test this
						errorMessage: 'username can contain only letters and numbers or underscore',
				},
				trim: { options: [' ',] },
		}, 
		firstname: {
				isLength: { 
						min: 3, 
						max: 50,
						errorMessage: "must be between 3 to 50 ",
				},
				matches: {
						options: [/^[a-zA-Z0-9_\-áéíóúüñ ]*$/], // test this
						errorMessage: 'firstname has unsuported characters',
				},
				errorMessage: "invalid firstname",
				trim: { options: [' ',] },
		}, 
		lastname: {
				isLength: { 
						min: 0, 
						max: 50,
						errorMessage: "must be between 3 to 50 ",
				},
				matches: {
						options: [/^[a-zA-Z0-9_\-áéíóúüñ ]*$/], // test this
						errorMessage: 'lastname has unsuported characters',
				},
				errorMessage: "invalid lastname",
				trim: { options: [' ',] },
		},
		email:{
				isEmpty: true,
				isEmail: {
						options:{
								allow_display_name: false,
								require_display_name: false,
								allow_utf8_local_part: true,
								require_tld: true,
								allow_ip_domain: false,
								domain_specific_validation: false,
								ignore_max_length: true,
								blacklisted_chars: ' ',
						},
						errorMessage: 'is not ainvalid email address',
				},
				isLength: {  
						max: 100,
						errorMessage: 'email must be less than 60 characters long',
				},
				normalizeEmail:{
						options:{
								all_lowercase: true,
								gmail_lowercase: true,
								gmail_remove_dots: false,
								gmail_remove_subaddress: true,
								gmail_convert_googlemaildotcom: true,
								outlookdotcom_lowercase: true,
								yahoo_lowercase: true,
								yahoo_remove_subaddress: true,
								icloud_lowercase: true,
								icloud_remove_subaddress: true,
						},
					
				},
				custom: { // check that there are no duplicates
						options: (mobileNumber, params) => {  // must run after normalization
								let resource = params.req.resource;
								/* Like in the username, if in the update request
								 * the mobileNumber is not being changed
								 * we allow the request to continue */
								if(resource) if(resource.mobileNumber == mobileNumber) return true;
								// continue checking if the new phone number is not in the db 
								userModel.find({ mobileNumber }).then(
										users => { 
												if (users.length > 0) 
														return Promise.reject('Phone number already in use')
										})
						}
				},
				errorMessage: 'invalid email',
		},
		mobileNumber:{
				isMobilePhone:{ 
						options: [ phoneNumbersLocales ], 
				},
				custom: { // check that there are no duplicates
						options: (email, params) => {  // must run after normalization
								let resource = params.req.resource;
								/* Like in the username, if in the update request
								 * the email is not being changed
								 * we allow the request to continue */
								if(resource) if(resource.email === email) return true;
								// continue checking if the new email is not in the db 
								userModel.find({ email }).then(
										users => { 
												if (users.length > 0) 
														return Promise.reject('Email already in use')
										})
						}
				},
		},
		password:{
				isStrongPassword:{
						options:{  
								minLength: 8, 
								minLowercase: 1, 
								minUppercase: 1, 
								minNumbers: 1, 
								minSymbols: 0,
								returnScore: false, 
								pointsPerUnique: 1, 
								pointsPerRepeat: 0.5, 
								pointsForContainingLower: 10, 
								pointsForContainingUpper: 10, 
								pointsForContainingNumber: 10, 
								pointsForContainingSymbol: 10,
						},
						errorMessage: "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number",
				}
		},
}



const validateSchema = (req, res, next) => {
    // Validate incoming input
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
		next(); // everything checks out
}


export { validate, validateSchema, postValidationSchema, userValidators, userValidationSchema,  }
