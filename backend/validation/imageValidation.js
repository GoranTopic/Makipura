/* this validator middleware checks the image to be posted, and read it to see 
 * if it is an actual image, 
 * it does not merely check the mime type as multer does.
 * */
import { allowedFileTypes } from '../config.js';
import FileType from 'file-type';
import  fs from 'fs';

let allowedRegex = new RegExp(allowedFileTypes.join("|"), 'gi');

// there might be a more elegant way of writting this.
// but im too tired and will not do it tonight
// I must find a way to do Promise.all() with every 

const validateImages = (req, res, next) => 
		Promise.all( 
				req.files.image.map( async image => { 
						let type =  await FileType.fromFile(image.path);
						// get file type 
						if(type){ 
								let result = type.ext.match(allowedRegex);
								if(result) return { ...image, supported: true, type: type }; 
								// is allowed
								else return { ...image, supported: false, type: type };
								// is not allowed type
						}else{ // unsuported type
								return { ...image, supported: false, type: type }
						}
				})
		)
				.then(results => { 
						let allpassed = results.every(result => result.supported);
						if(allpassed) next();
						else {  
								results.forEach(image => // delete images
										fs.unlink(image.path, error => {
												if(error) 
														res.status(500) 
																.json({ 
																		status: 'failure', 
																		msg: 'could not delete file' 
																});
										}
										));	
								res.status(400) 
										.json({ 
												status: 'failure', 
												msg: 'file type not supported' 
										});
						}
				})
				.catch(error => {
						console.log(error);
				})

export { validateImages }

