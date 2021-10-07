import { body, checkSchema, validationResult } from 'express-validator';
import postModel from './models.js';
import userModel from '../users/models.js';
import { allowedConditions, allowedCurrencies } from './configs/posts.js'
import { isCurrencyOptions, } from './configs/validators.js';

let isOptional = true;

let lessThanPriceCap = price  => {
		/* checks the value of a price passed and 
		 * return true if it is less then the cap */
		let cap = 100000 // cap at a hundred thousand 
		let value = parseInt(price, 10); // base 10
		return ( value >=  cap )?  Promise.reject('Price cannot be higher than: ' + cap) : true
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


const priceValidation = (isOptional=false) => 
		body('price')
				.optional(isOptional)
				.notEmpty().withMessage("cannot be empty")
				.isLength({  max: 9 }).withMessage('must be less than 9 digits long')
				.isCurrency(isCurrencyOptions).withMessage('cannot be negative value')
				.custom(lessThanPriceCap)
				.trim(' ')

const conditionValidation = (isOptional=false) => 
		body('condition')
				.optional(isOptional)
				.notEmpty().withMessage("cannot be empty")
				.matches(allowedConditions.join("|"))

const postValidators = [
		titleValidation(),
		descriptionValidation(),
		currencyValidation(),
		priceValidation(),
		conditionValidation(),
]


const updatePostValidators = [
		titleValidation(isOptional),
		descriptionValidation(isOptional),
		currencyValidation(isOptional),
		priceValidation(isOptional),
		conditionValidation(isOptional),
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

export { validate, postValidators, updatePostValidators }
