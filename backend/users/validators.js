import { body, checkSchema, validationResult } from 'express-validator';
import postModel from '../posts/models.js';
import userModel from './models.js';
import { allowedConditions, blockedUsernames, allowedCurrencies } from '../config.js'
import {  isCurrencyOptions, isStrongPasswordOptions, 
		isEmailOptions, normalizeEmailOptions,
		phoneNumbersLocales, } from './configs/validatiors.js';

let isOptional = true;

let checkBlockedUsernames = blockedUsernames => username => {
		// continue checking if it is one of the blocked usernames 
		let isNotBlocked = blockedUsernames.every( // check is the given user name is equal to 
				blocked => blocked.normalize() !== username.normalize()); 
		// if username was not blocked, 
		if(isNotBlocked) return true;
		else return  Promise.reject('That username cannot be used'); 
}

let checkUniqueness = fieldName => (fieldValue, req)  => {
		/* this function can be user to check the uniqueness  of aa field,
		 * it checks for the field in the db base which should return 0 number elements
		 * however if the same value as the previous value is passed. it checks for
		 * a already queried resource */
		let filter = {} 
		let resource = req.resource
		if(resource) if(resource[fieldName]  ===  fieldValue) return true;
		// check if it is already in databse
		filter[fieldName] = fieldValue // add field to filter
		return userModel.find(filter).then( results => { 
				if (results.length > 0) return Promise.reject( fieldName + ' already in use');
				else return true
		});
}

const usernameValidation = (isOptional=false) => 
		body('username')
				.optional(isOptional)
				.isLength({ min: 3, max: 50, }).withMessage("must be between 3 to 50") 
				.matches(/^[a-zA-Z0-9_\-áéíóúüñ]*$/).withMessage("invalid characters")
				.custom(checkBlockedUsernames(blockedUsernames)) 
				.custom(checkUniqueness('username'))
				.trim(' ')

const firstnameValidation = (isOptional=false) => 
		body('firstname')
				.optional(isOptional)
				.isLength({ min: 3, max: 50, }).withMessage("must be between 3 to 50") 
				.matches(/^[a-zA-Z0-9_\-áéíóúüñ ]*$/).withMessage("invalid characters")
				.trim(' ')

const lastnameValidation = (isOptional=false) => 
		body('lastname')
				.optional(isOptional)
				.optional()
				.isLength({ min: 3, max: 50, }).withMessage("must be between 3 to 50") 
				.matches(/^[a-zA-Z0-9_\-áéíóúüñ ]*$/).withMessage("invalid characters")
				.trim(' ')


const emailValidation = (isOptional=false) => 
		body('email')
				.optional(isOptional)
				.isLength({ max: 50, }).withMessage("can't be longer than 50") 
				.matches(/^[a-zA-Z0-9_\-\@\.áéíóúüñ ]*$/).withMessage("invalid characters")
				.isEmail(isEmailOptions).withMessage("invalid characters")
				.normalizeEmail(normalizeEmailOptions)
				.custom(checkUniqueness('email'))
				.trim(' ')

const mobileNumberValidatior = (isOptional=false) => 
		body('mobileNumber')
				.optional(isOptional)
				.isMobilePhone(phoneNumbersLocales)
				.custom(checkUniqueness('mobileNumber'))


const passwordValidation = (isOptional=false) => 
		body('password')
				.optional(isOptional)
				.isStrongPassword(isStrongPasswordOptions)
				.withMessage("Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number")

const userValidators = [
		usernameValidation(),
		firstnameValidation(),
		lastnameValidation(),
		emailValidation(),
		mobileNumberValidatior(),
		passwordValidation(),
]

const updateUserValidators = [
		usernameValidation(isOptional),
		firstnameValidation(isOptional),
		lastnameValidation(isOptional),
		emailValidation(isOptional),
		mobileNumberValidatior(isOptional),
		passwordValidation(isOptional),
]


const validate = validations => async (req, res, next) => {
		await Promise.all( validations.map( validation => validation.run(req) ) );
		const errors = validationResult(req);
		if (errors.isEmpty()) {
				console.log("passed form validation")
				return next();
		}else{
				console.log("errors in form validation");
				res.status(400).json({ errors: errors.array() });
		} 
};

export { validate, userValidators, updateUserValidators }
