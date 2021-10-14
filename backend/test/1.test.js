import express from 'express';
import userModels from '../users/models.js'
import postModels from '../posts/models.js'
import storeModels from '../stores/models.js'
import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import dotenv from 'dotenv';
import app from '../app.js';
let should = chai.should();
var expect = chai.expect;

dotenv.config(); // run dot env to get enviroment variables
const env = process.env;

chai.use(chaiHttp);

const agent = chai.request.agent(app);


describe('Testing basic getters', () => {

		before( done => { // drop database before testing
				userModels.deleteMany({}, err => { if(err) console.log(err) });
				postModels.deleteMany({}, err => { if(err) console.log(err) });
				storeModels.deleteMany({}, err => { if(err) console.log(err) });
				done();
		});


		it('query all stores', done => {
				chai.request(app)
						.get('/store/all')
						.end((err, res) => {
								res.should.have.status(200);
								res.body.should.be.a('array');
								//res.body.should.have.property('errors');
								res.body.length.should.be.eql(0);
								done();
						});
		});



		it('query all users', done => {
				chai.request(app)
						.get('/user/all')
						.end((err, res) => {
								res.should.have.status(200);
								res.body.should.be.a('array');
								//res.body.should.have.property('errors');
								res.body.length.should.be.eql(0);
								done();
						});
		});

		it('query all posts', done => {
				chai.request(app)
						.get('/post/')
						.end((err, res) => {
								res.should.have.status(200);
								res.body.should.be.a('array');
								res.body.length.should.be.eql(0);
								done();
						});
		});

});



describe('Creating User', function() {
		this.timeout(5000);
		before( done => { // drop database before testing
				userModels.deleteMany({}, err => { if(err) console.log(err) });
				done();
		});
		it('Sign up user', async () => {
				await agent
						.post('/auth/signup')
						.field('username', 'testuser1')
						.field('email', 'testuser@gmail.com')
						.field('mobileNumber', '17863403592')
						.field('firstname', 'newUser')
						.field('lastname', 'doe')
						.field('password', 'SomeSecret1')
						.attach('profileImage', '/home/telix/Pictures/wallhaven-4y25ld.jpg')
						.attach('backgroundImage', '/home/telix/Pictures/wallhaven-o32d7p.png')
						.then(res => {
								try{  
										expect(res).to.be.json;
										expect(res).to.have.status(200);
										expect(res).to.have.property("status");
										expect(res).to.have.cookie("maki-cookie");
								}catch(err){
										console.log(res.body);
										console.log("this ran");
										throw err;
								}
						});
		});
		it('Sign in', async () => {
				await agent
						.post('/auth/signin')
						.field('username', 'testuser1')
						.field('password', 'SomeSecret1')
						.then(res => {
								try{  
										expect(res).to.be.json;
										expect(res).to.have.status(200);
										expect(res).to.have.property("status");
								}catch(err){
										console.log(res.body);
										throw err;
								}
						});
		});
		it('Get created user', async () => {
				await agent
						.get('/user/testuser1')
						.then( res => {
								try{  
										let body = res.body;
										expect(res).to.have.status(200);
										expect(body).to.have.property("username", "testuser1");
										expect(body).to.have.property("firstname", 'newUser');
										expect(body).to.have.property("lastname", 'doe');
										expect(body).to.have.property("profileImage");
										expect(body).to.have.property("backgroundImage");
								}catch(err){
										console.log(res.body);
										throw err;
								}
						});
		});
		it('test whoamI', async () => {
				await agent
						.get('/user/whoami')
						.then( res => {
								try{  
										let body = res.body;
										expect(res).to.have.status(200);
										expect(body).to.have.property("username", "testuser1");
										expect(body).to.have.property("firstname", 'newUser');
										expect(body).to.have.property("lastname", 'doe');
										expect(body).to.have.property("profileImage");
										expect(body).to.have.property("backgroundImage");
								}catch(err){
										console.log(res.body);
										throw err;
								}
						});
		});
});




describe('CRUD Post', function() {
		//this.timeout(5000);
		this.post = '';
		it('CREATE Post', async () => {
				await agent
						.post('/post/')
						.field('title', 'New Post')
						.field('description', 'This is a new post')
						.field('currency', 'USD')
						.field('price', '102')
						.field('condition', 'new')
						.field('password', 'SomeSecret1')
						.attach('image', '/home/telix/Pictures/wallhaven-o32d7p.png')
						.attach('image', '/home/telix/Pictures/wallhaven-57yjz8.jpg')
						.attach('image', '/home/telix/Pictures/wallhaven-9mr53w.jpg')
						.attach('image', '/home/telix/Pictures/wallhaven-m92r7k.jpg')
						.then( res => {
								try{  
										let body = res.body;
										expect(res).to.have.status(200);
										expect(body).to.have.property("msg");
										this.post = res.body.msg;
								}catch(err){
										console.log(res.body);
										throw err;
								}
						});
		});
		it('READ Post', async () => {
				await agent
						.get('/post/id/' + this.post)
						.then( res => {
								try{  
										let body = res.body;
										expect(res).to.have.status(200);
										expect(body).to.have.keys([
												"_id",
												"title",
												"description", 
												"currency", 
												"price", 
												"condition", 
												"userid", 
												"images",
												"views",
												"datePosted",
												"engagement",
										]);
								}catch(err){
										console.log(res.body);
										throw err;
								}
						});
		});
		it('UPDATE Post chaging images', async () => {
				await agent
						.put('/post/id/' + this.post)
						.field('title', 'Updated Post')
						.field('description', 'This is post has been updated')
						.field('price', '302')
						.attach('image', '/home/telix/Pictures/wallhaven-x8ev3l.jpg')
						.attach('image', '/home/telix/Pictures/wallhaven-0wjvmq.jpg')
						.then( res => {
								try{  
										expect(res).to.have.status(200);
										expect(res.body).to.property('status', 'success');
										return agent
												.get('/post/id/' + this.post)
												.then( res => {
														let body = res.body;
														expect(body).to.have.property('title', 'Updated Post');
														expect(body).to.have.property('description', 
																'This is post has been updated');
														expect(body).to.have.property('price', 302);
														expect(body.images.length).to.be.eql(2);
												});
								}catch(err){
										console.log(res.body);
										throw err;
								}
						});
		});
		it('UPDATE Post not changing images', async () => {
				await agent
						.put('/post/id/' + this.post)
						.field('title', 'Updated Post')
						.field('description', 'This is post has been updated')
						.field('price', '302')
						.then( res => {
								try{  
										expect(res).to.have.status(200);
										expect(res.body).to.property('status', 'success');
										return agent
												.get('/post/id/' + this.post)
												.then( res => {
														let body = res.body;
														expect(body).to.have.property('title', 'Updated Post');
														expect(body).to.have.property('description', 
																'This is post has been updated');
														expect(body).to.have.property('price', 302);
														expect(body.images.length).to.be.eql(2);
												});
								}catch(err){
										console.log(res.body);
										throw err;
								}
						});
		});
		it('DELETE Post', async () => {
				await agent
						.delete('/post/id/' + this.post)
						.then( res => {
								try{  
										expect(res).to.have.status(200);
										expect(res.body).to.property('status', 'success');
										return agent
												.get('/post/id/' + this.post)
												.then( res => {
														let body = res.body;
														expect(res).to.have.status(404);
														expect(body).to.have.property('status', 'failure');
														expect(body).to.have.property('msg', 'post not found');
												});
								}catch(err){
										console.log(res.body);
										throw err;
								}
						});
		});




});









/*
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
		*/
