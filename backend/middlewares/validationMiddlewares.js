import { body, checkSchema, validationResult } from 'express-validator';
import { blockedUsernames, phoneNumbersLocales, conditionsList, currenciesList } from "../config/emunsAndLists.js";
import postModel from '../models/postModel.js'
import userModel from '../models/userModel.js'


const checkBlockedUsernames = blockedUsernames => username => {
		// continue checking if it is one of the blocked usernames 
		let isNotBlocked = blockedUsernames.every( // check is the given user name is equal to 
				blocked => blocked.normalize() !== username.normalize()); 
		// if username was not blocked, 
		if(isNotBlocked) return true;
		else return  Promise.reject('That username cannot be used'); 
}


const checkUniqueness = fieldName => fieldValue  => {
		/* this function can be user to check the uniqueness  of aa field,
		 * it checks for the field in the db base which should return 0 number elements
		 * however if the same value as the previous value is passed. it checks for
		 * a already queried resource */
		let filter = {} 
		let resource = params.req.resource; // must be single obj
		if(resource) if(resource[fieldName]  ===  fieldValue) return true;
		// check if it is already in databse
		filter[fieldName] = fieldValue // add field to filter
		return userModel.find(filter).then( results => { 
				if (results.length > 0) return Promise.reject( fieldName + ' already in use');
				else return true
		});
}

const lessThanPriceCap = price  => {
		/* checks the value of a price passed and 
		 * return true if it is less then the cap */
		let cap = 100000 // cap at a hundred thousand 
		let value = parseInt(price, 10); // base 10
		return ( value >=  cap )?  Promise.reject('Price cannot be higher than: ' + cap) : true
}


const titleValidation = () => 
		body('title')
				.notEmpty().withMessage("cannot be empty")
				.isLength({ min: 5, max: 50, }).withMessage('title most be between 5 and 50 characters')
				.matches(/^[a-zA-Z0-9_ ]*$/).withMessage('title can contain only letters and numbers or underscore')
				.trim(' ')

const descriptionValidation = () => 
		body('description')
				.notEmpty().withMessage("cannot be empty")
				.isLength({ min: 5, max: 500, }).withMessage('title most be between 5 and 50 characters')
				.matches(/^[a-zA-Z0-9_\-\!\?\(\)\&\%\.\,\+\=áéíóúüñ¿¡ ]*$/).withMessage('invalid Character')
				.trim(' ')

const currencyValidation = () => 
		body('currency')
				.notEmpty().withMessage("cannot be empty")
				.isLength({ min: 3, max: 3, }).withMessage('must be 3 characters')
				.matches(/^[A-Z]*$/).withMessage('Currency code must contail only capial letters')
				.matches(currenciesList.join("|"))
				.trim(' ')

let isCurrencyOptions = {  
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
}


const priceValidation = () => 
		body('price')
				.notEmpty().withMessage("cannot be empty")
				.isLength({  max: 9 }).withMessage('must be less than 9 digits long')
				.isCurrency(isCurrencyOptions).withMessage('cannot be negative value')
				.custom(lessThanPriceCap)
				.trim(' ')

const conditionValidation = () => 
		body('condition')
				.notEmpty().withMessage("cannot be empty")
				.matches(conditionsList.join("|"))


const postValidators = [
		titleValidation(),
		descriptionValidation(),
		currencyValidation(),
		priceValidation(),
		conditionValidation(),
]


const validate = validations => async (req, res, next) => {
		await Promise.all( validations.map( validation => validation.run(req) ) );
		const errors = validationResult(req);
		if (errors.isEmpty()) {
				console.log("no errors")
				return next();
		}else{
				console.log("with errors");
				res.status(400).json({ errors: errors.array() });
		} 
};



const usernameValidation = () => 
		body('username')
				.isLength({ min: 3, max: 50, }).withMessage("must be between 3 to 50") 
				.matches(/^[a-zA-Z0-9_\-áéíóúüñ]*$/).withMessage("invalid characters")
				.custom(checkBlockedUsernames(blockedUsernames)) 
				.custom(checkUniqueness('username'))
				.trim(' ')

const firstnameValidation = () => 
		body('firstname')
				.isLength({ min: 3, max: 50, }).withMessage("must be between 3 to 50") 
				.matches(/^[a-zA-Z0-9_\-áéíóúüñ ]*$/).withMessage("invalid characters")
				.trim(' ')
 
const lastnameValidation = () => 
		body('lastname')
				.optional()
				.isLength({ min: 3, max: 50, }).withMessage("must be between 3 to 50") 
				.matches(/^[a-zA-Z0-9_\-áéíóúüñ ]*$/).withMessage("invalid characters")
				.trim(' ')

let isEmailOptions = {  
		allow_display_name: false,
		require_display_name: false,
		allow_utf8_local_part: true,
		require_tld: true,
		allow_ip_domain: false,
		domain_specific_validation: false,
		ignore_max_length: true,
		blacklisted_chars: ' ',
}

let normalizeEmailOptions = {
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
}

const emailValidation = () => 
		body('email')
				.isLength({ max: 50, }).withMessage("can't be longer than 50") 
				.matches(/^[a-zA-Z0-9_\-\@\.áéíóúüñ ]*$/).withMessage("invalid characters")
				.isEmail(isEmailOptions).withMessage("invalid characters")
				.normalizeEmail(normalizeEmailOptions)
				.custom(checkUniqueness('email'))
				.trim(' ')

const mobileNumberValidatior = () => 
		body('mobileNumber')
				.isMobilePhone(phoneNumbersLocales)
				.custom(checkUniqueness('mobileNumber'))

let isStrongPasswordOptions = {
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
}


const passwordValidation = () => 
		body('password')
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


export { validate, userValidators, postValidators, }
