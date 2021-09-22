/* this validator middleware checks the image to be posted, and read it to see 
 * if it is an actual image, 
 * it does not merely check the mime type as multer does.
 * */
import { allowedFileTypes } from './config.js';
import FileType from 'file-type';
import  fs from 'fs';

// there might be a more elegant way of writting this.
// but im too tired and will not do it tonight
// I must find a way to do Promise.all() with every 

const validateUploadedImages = (req, res, next) => 
		Promise.all( 
				req.files.image.map( async image => { 
						let type =  await FileType.fromFile(image.path);
						// get file type 
						if(type){ 
								let result = type.ext.match(allowedFileTypes);
								if(result) return { supported: true, type: type }; 
								// is allowed
								else return { supported: false, type: type };
								// is not allowed type
						}else{ // unsuported type
								return { supported: false, type: type }
						}
				})
		)
				.then(results => { 
						let allpassed = results.every(result => result.supported);
						if(allpassed) next();
						else res.status(400)
								.json({ 
										status: 'failure', 
										msg: 'file type not supported' 
								});
				})
				.catch(error => {
						console.log(error);
				})




export { validateUploadedImages }

