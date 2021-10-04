import Stripe from 'stripe';
import express from 'express';
import dotenv from 'dotenv';

// run dot env to get enviroment variables
dotenv.config();
const ENV = process.env;

const stripe = Stripe("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const paymentRouter = express.Router();


paymentRouter.route('/config')
// send the public key to client when requested
		.get((req, res) => {
						res.send({ publishableKey: ENV.STRIPE_PUBLIC_KEY });
				});

export default paymentRouter
