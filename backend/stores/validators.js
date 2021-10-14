import { body, checkSchema, validationResult } from 'express-validator';
import storeModel from './models.js';
import { allowedConditions, allowedCurrencies } from './configs/stores.js'
import { isCurrencyOptions, isEmailOptions, normalizeEmailOptions, phoneNumbersLocales } from './configs/validators.js';
import userModel from '../users/models.js';

let isOptional = true;

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
		return storeModel.find(filter).then( results => { 
				if (results.length > 0) return Promise.reject( fieldName + ' already in use');
				else return true
		});
}

const titleValidation = (isOptional=false) => 
		body('title')
				.optional(isOptional)
				.notEmpty({ ignore_white_spaces: false }).withMessage("cannot be empty")
				.isLength({ min: 5, max: 50, }).withMessage('title most be between 5 and 50 characters')
				.matches(/^[a-zA-Z0-9_ ]*$/).withMessage('title can contain only letters and numbers or underscore')
				.trim(' ')

const descriptionValidation = (isOptional=false) => 
		body('description')
				.optional(isOptional)
				.notEmpty().withMessage("cannot be empty")
				.isLength({ min: 5, max: 500, }).withMessage('title most be between 5 and 50 characters')
				.matches(/^[a-zA-Z0-9_\-\!\?\(\)\&\%\.\,\+\=áéíóúüñ¿¡ ]*$/).withMessage('invalid Character')
				.trim(' ')

const currencyValidation = (isOptional=false) => 
		body('currency')
				.optional(isOptional)
				.notEmpty().withMessage("cannot be empty")
				.isLength({ min: 3, max: 3, }).withMessage('must be 3 characters')
				.matches(/^[A-Z]*$/).withMessage('Currency code must contail only capial letters')
				.matches(allowedCurrencies.join("|"))
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

const locationValidatior = (isOptional=false) => 
		body('location')
				.optional(isOptional)
				.isLatLong()

const storeValidators = [
		titleValidation(),
		descriptionValidation(),
		currencyValidation(),
		emailValidation(),
		mobileNumberValidatior(),
		locationValidatior(),
]

const updateStoreValidators = [
		titleValidation(isOptional),
		descriptionValidation(isOptional),
		currencyValidation(isOptional),
		emailValidation(isOptional),
		mobileNumberValidatior(isOptional),
		locationValidatior(isOptional),
]

const validate = validations => async (req, res, next) => {
		await Promise.all( validations.map( validation => validation.run(req) ) );
		const errors = validationResult(req);
		if (errors.isEmpty()) {
				return next();
		}else{
				res.status(400).json({ errors: errors.array() });
		} 
};

export { validate, storeValidators, updateStoreValidators }
