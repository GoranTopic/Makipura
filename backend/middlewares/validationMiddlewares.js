import { body, checkSchema, validationResult } from 'express-validator';

const postValidationSchema = {
		title: {
				notEmpty: {
						errorMessage: "post most havea title",
				}, 
				matches: {
						options: [/^[a-zA-Z0-9_ ]*$/],
						errorMessage: 'title can contain only letters and numbers or underscore',
				},
				isLength: { 
						options: {
								min: 5,
								max: 50,
						},
						errorMessage: "title most be between 5 and 50 characters",
				},
				errorMessage: "title problem",
		}, 
		description: {
				notEmpty: true, 
				isAlphanumeric: true,
		}, 
		price: {
				notEmpty: {
						errorMessage: "Must have a price",
				}, 
				isNumeric:{ 
						errorMessage: "price must be a number", 
				}, 
				errorMessage: "price must be a currecy",
		},
}

const userValidationSchema = {
		username: {
				notEmpty: true, 
				custom: {  
						options: username => {
								return [ 'signup', 'signin', 'signout', 'all', 'whoami' ]
										.every( // check is the given user name is equal to 
												paths => paths.normalize() !== username.normalize()
										);
						}
				},
				rtrim: {
						options: [[' ', '-']],
						// Options as an array
				},
		}, 
		firstname: {
				notEmpty: true, 
				isLength: { min: 3, max: 50 },
		}, 
		lastname: {
				notEmpty: true, 
				isLength: { min: 3, max: 50 },
		},
		email:{
				isEmail: true,
				isLength: { min: 3, max: 50 },
		},
		phoneNumber:{
				isModilePhone:{
						locale: [ 'en-AU', 'en-CA', 'en-GB', 'en-GG', 'en-GH', 'en-HK', 'en-MO', 'en-IE', 'en-IN', 'en-KE', 'en-MT', 'en-MU', 'en-NG', 'en-NZ' ],
				},
		},
		password:{
				isStrongPassword:{
						minLength: 8, 
						minLowercase: 1, 
						minUppercase: 1, 
						minNumbers: 1, 
						returnScore: true, 
						pointsPerUnique: 1, 
						pointsPerRepeat: 0.5, 
						pointsForContainingLower: 10, 
						pointsForContainingUpper: 10, 
						pointsForContainingNumber: 10, 
						pointsForContainingSymbol: 10,
						errorMessage: "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number",
				}
		},
}




const postValidate = () => [ 

		checkPostValidation		
]

const checkPostValidation = (req, res, next) => {
		/* this function check if there where any problems with the validation */
		console.log('this ran');
		try {
				validationResult(req).throw();
				next();
		} catch (err) {
				
				res.status(422).json({ errors: err.mapped()  });
		}
}


const userValidation  = (req, res, next) =>{
		/*  */
		next();
}


const validate = (req, res, next) => {
    // Validate incoming input
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
		next(); // everything checks out
}

export { validate, postValidationSchema, postValidate, userValidation }
