/* multer takes an multiform input and puts it text fields in req.body 
 * and it file in req.files */
import multer from 'multer'; // multer
import { allowedFileTypes } from '../config.js'

let allowedRegex = new RegExp(allowedFileTypes.join("|"));

// storage engine, which holds file in Memory istead of writting to disk
// used to find a way to veryfy and manipulate images before saving them
// alas, to no avail
//const memoryStorage = multer.memoryStorage();

// storage engine to save file to disk
const diskStorage = multer.diskStorage({ 
		// check destination
		destination: function (req, file, cb){
				cb(null, 'public/posts/')
		},
		filename: function (req, file, cb){ // save file the given mimetype
				let extension = file.mimetype.split("/")[1];
				let uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
				let filename = file.fieldname + '-' + uniqueSuffix + '.' + extension;
				cb(null, filename);
  }
})

const imageFilter = (req, file, cb) => {
		let extension = file.mimetype.split("/")[1];
		let found = extension.match(allowedRegex)
		if(found){ // if it has an allowed Mimetype
				cb(null, true); // alow to pass
		}else{
				//cb(null, false); // deny
				cb(new Error('file is not a image'));
		}
}


const upload = multer({
		storage: diskStorage,
		limits: {//   bytes * kb   * mb   * gb 
				fileSize: 1000  * 1000 * 1000 * 1,// number of bytes
				fields: 10,
				files: 10,
		},
		fileFilter: imageFilter,
		preservePath: true,
});


// image uploader
const imageUploader = upload.fields([
		{ name: 'image', maxCount: 6 },
		{ name: 'profileImage', maxCount: 1 },
		{ name: 'backgroundImage', maxCount: 1 },
]);

const multiFormHandler = (req, res, next) => {
		/* this function uploads the images and parse the ultiform text */
		imageUploader(req, res, function (error) {
				if (error instanceof multer.MulterError) {
						console.error(error)
						res.status(500); // A Multer error occurred when uploading.
				}else if (error) {
						// An unknown error occurred when uploading.
						console.error(error);
						res.status(400).json({ status: 'failure', msg: error });
				}else{
						// Everything went fine.	
						next();
				}
		});
}

export  { multiFormHandler }  
