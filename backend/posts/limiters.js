import postModel from "./models.js"

// move values to config
let count_limit = 3; // you can only make thre posts 
let time_range = new Date().setHours(23,59,59);

const limitByTime = (req, res, next) => {
		let user = req.user || req.resource;
		postModel.find({ 
				"userid":  user._id,
				"timestamp": 
				{     
						$gte:  new Date(new Date().setHours(0,0,0)),     
						$lt :  new Date(time_range) 
				} 
		}, (error, posts) => {
				if(error) res.status(500).json({ error }); // if there was an error
				else if( posts.length >= count_limit ) 
						res.status(402).json({ // too many posts in time reange
								status: "failure", 
								msg: `to many posts in ${time_range}`
						});
				else next(); // let it pass
		});
}
export { limitByTime };
