import setCookie from 'set-cookie-parser';
import axios from './axios-config.js';

const checkCookie = async (cookie, username = null)  => 
		await axios.get('/user/whoami', { }, { 
				withCredentials: false,
				headers: { Authorization: `Bearer ${cookie.value}` },
		}).then( res => {
				if(username) return true;
				if(res.data.username === username) return true;
				else return false;
		}).catch( error => {
				console.log(error);
				if(error.response) 
						console.log(error.response.data); 
				return null;
		})


const signin = async ({ username, password }) =>  
		await axios
				.post( '/auth/signin', {  //send query without 
						"username": username, //auto seting the cookie value
						"password": password,
				}, { withCredentials: false })
				.then( res => { // this only run with status 200
						let cookie = setCookie.parse(res, {
								decodeValues: true,  // default: true
								map: true
						});
						return { 
								data: res.data.status, 
								cookie: cookie["maki-cookie"],
						};
				})
				.catch( error => { // handle error
						throw error;
						//return { suceess: false, msg: error.response.data};
				})

const signout = async () =>
		await axios
				.post('/auth/signout')
				.then( res => {
						if(res.data.status === "success") return true;
				})
				.catch( error => {
						if(error.response) 
								console.log(error.response.data); 
						return false;
				})

export { signin, signout, checkCookie }
