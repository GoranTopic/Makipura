import express from 'express';
import chai from 'chai';
import request from 'supertest';
import dotenv from 'dotenv';
import server from '../server.js';

dotenv.config(); // run dot env to get enviroment variables
const env = process.env;

const agent = request.agent(server);

describe('testing user CRUD', () => {

		it('no one should be logged in', done => {
				agent
						.get('/user/whoami')
						.expect(401)
						.expect('Content-Type', /json/)
						.expect('{"status":"faliure","msg":"user is not logged in"}')
						.end((err, res) => {
								if (err){
										console.log(res.body);
										return done(err);
								}else{
										//console.log(res.body);
										done();
								}
						});
		});

		it('it should create user', done => {
				agent
						.post('/auth/signin')
						.field('username', 'testuser1')
						.field('email', 'testuser@gmail.com')
						.field('mobileNumber', '17863403592')
						.field('firstname', 'newUser')
						.field('lastname', 'doe')
						.field('password', 'SomeSecret1')
						.attach('profileImage', '/home/telix/Pictures/wallhaven-4y25ld.jpg')
						.attach('backgroundImage', '/home/telix/Pictures/wallhaven-o32d7p.png')
						.expect(200)
						.accept('application/json')
						.expect('Content-Type', /json/)
						//.expect(response.body).toEqual({ status: 'success' })
						.end((err, res) =>  {
								if (err){
										console.log(err);
										console.log(req.body);
										//console.log(res.body);
										return done(err);
								}else{
										//console.log(res.body);
										done();
								}
						});
		});

		
		it('local login test user with username', done => {
				agent
						.post('/auth/signup')
						.field('username', 'testuser1')
						.field('password', 'SomeSecret1')
						.expect(200)
						.expect('Content-Type', /json/)
						.expect('{"status":"success"}')
						.end((err, res) => {
								if (err){
										console.log(err);
										console.log(req.body);
										//console.log(res.body);
										return done(err);
								}else{
										//console.log(res.body);
										done();
								}
						});
		});
		

});
 
