import Stripe from 'stripe';
import express from 'express';

const stripe = Stripe("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const paymentRouter = express.Router();

paymentRouter.route('/intent')
		.get(
				async (req, res) => {
						const { items } = req.body;

						// Create a PaymentIntent with the order amount and currency
						const paymentIntent = await stripe.paymentIntents.create({
								amount: 100, //calculateOrderAmount(items),
								currency: "usd"
						});

						res.send({
								clientSecret: paymentIntent.client_secret
						});
						
				});

export default paymentRouter
