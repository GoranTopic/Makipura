import initSocket from './socket.js';
import Axios from 'axios';
import { BASE_API } from '@env';
import setCookie from 'set-cookie-parser';
//import loginUser from './login';

const axios = Axios.create({
		baseURL: BASE_API,
});
				

const checkCookie = async cookie => 
		await axios.get('/user/whoami', {
		}, { 
				withCredentials: false,
				headers: { Authorization: `Bearer ${cookie.value}` },
		}
		).then( res => {
				console.log("check cookie: ")
				console.log(res);
				return res;
		}).catch( error => {
				console.log(error);
				if(error.response) console.log(error.response.data); 
				return null;
		})


const signin = async ({username, password}) =>  
		await axios.post( '/auth/signin', {  
				"username": username,
				"password": password,
		}, { withCredentials: false }
		).then( res => {
				// handle success
				if(res.data.status === "success"){
						let cookie = setCookie.parse(res, {
								decodeValues: true  // default: true
						});
						return cookie;
				}else{
						console.log("could not get success");
						console.log(res.data.status);
						return null;
				}
		}).catch( error => {
				// handle error
				console.log(error)
				if(error.response) console.log(error.response.data); 
				return null;
		})

const signout = async () =>
		await axios.post('/auth/signout')
				.then( res => {
				if(res.data.status === "success")
						return true
				}).catch( error => {
						return false;
				})


function inicialize(){
		// user data from memory,
		// 		validate cookie with server
		const userData = { 
				isSignedIn: false, 
				cookie: null,
		};

		const credentials ={  
				"username": "tim3",
				"password": "SuperSecret1"
		};

		signin(credentials).then( cookie => {
				console.log(cookie);
				userData.username = credentials.username;
				userData.cookie = cookie;
				userData.isSignedIn = true;
		}).then(() => 
				checkCookie(userData.cookie)
				.then( user => {  
						console.log("result from cookieCheck");
						console.log(user);
				})
		)

		/*
				.then(() => {
				console.log("signing out:")
				if(signout()){
						console.log("successfully signed out")
						userData.username = '';
						userData.cookie = null;
						userData.isSignedIn = false;
				}else{
						console.log("could not sign out")
				}
		}).then(() => {
				console.log("userData:");
				console.log(userData);
		});
		*/


		return {
				username: null,
				socket: initSocket(),
				isSignedIn: true,
				cookie: null,
		}
}

export default inicialize;
