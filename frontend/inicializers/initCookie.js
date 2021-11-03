import { signin, signout, checkCookie } from '../queries/auth.js';

const userData = { 
		isSignedIn: false, 
		cookie: null,
};

const credentials ={  
		"username": "tim3",
		"password": "SuperSecret1"
};

const initCookie = async () => {  

		const value = await signin(credentials).then( cookie => {
				console.log(cookie);
				userData.username = credentials.username;
				userData.cookie = cookie;
				userData.isSignedIn = true;
		}).then(() => 
				checkCookie(userData.cookie)
				.then( cookiePass => {  
						if(cookiePass) console.log("Cookie validated");
						else console.log("")
				})
		).then(() => {
				console.log("signing out:")
				if(signout()){
						console.log("successfully signed out")
						userData.username = '';
						userData.cookie = null;
						userData.isSignedIn = false;
				}else
						console.log("could not sign out")
		}).then(() => {
				console.log("userData:");
				console.log(userData);
		});

		return value;
}
