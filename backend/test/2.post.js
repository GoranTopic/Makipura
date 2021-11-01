import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server.js';
var expect = chai.expect;

chai.use(chaiHttp);

const agent = chai.request.agent(server);

describe('CRUD Post', function() {
		before( async () => {
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

