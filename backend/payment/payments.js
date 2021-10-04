import Stripe from 'stripe';
import express from 'express';
import dotenv from 'dotenv';

/* This payment solution uses stripe to process payment
 * beacsue of the nature of testing payment and
 * getting webhook from the strip server, I am going
 * test this at the end of the development */


// run dot env to get enviroment variables
dotenv.config();
const ENV = process.env;

// test key
const stripe = Stripe("sk_test_4eC39HqLyjWDarjtT1zdp7dc"); 

const calculateTotal = (items) => {
		// caculates the toal amount for the items wanting to buy
		return 1000; // fro now just return tem dollars
}

const sendPublicKey = (req, res) => 
		// send the public key to client when requested
		res.send({ publishableKey: ENV.STRIPE_PUBLIC_KEY })

const createPaymentIntent = async (req, res) => {
		// get the meyment method from client side
		const { paymentMethodType, currency, items } = req.body; 
		// Each payment method type has support for different currencies. In order to
		// support many payment method types and several currencies, this server
		// endpoint accepts both the payment method type and the currency as
		// parameters.
		//
		// Some example payment method types include `card`, `ideal`, and `alipay`.
		const params = {
				payment_method_types: [ paymentMethodType ],
				amount:  calculateTotal(items), // this is defined in the smalles currecy
				currency: currency,
		}
		// If this is for an ACSS payment, we add payment_method_options to create
		// the Mandate.
		if(paymentMethodType === 'acss_debit') 
				params.payment_method_options = {
						acss_debit: {
								mandate_options: {
										payment_schedule: 'sporadic',
										transaction_type: 'personal',
								},
						},
				}
		// Create a PaymentIntent with the amount, currency, and a payment method type.
		//
		// See the documentation [0] for the full list of supported parameters.
		//
		// [0] https://stripe.com/docs/api/payment_intents/create
		try {
				const paymentIntent = await stripe.paymentIntents.create(params);
				// Send publishable key and PaymentIntent details to client
				res.send({
						clientSecret: paymentIntent.client_secret,
				});
		} catch (e) {
				return res.status(400).send({
						error: {
								message: e.message,
						},
				});
		}
}


// Expose a endpoint as a webhook handler for asynchronous events.
// Configure your webhook in the stripe developer dashboard
// https://dashboard.stripe.com/test/webhooks

const handleWebhookRespose = async (req, res) => {
		// must email invoice to client
		// Handle the shipping of item
		// or let the buyer know that he must ship the item 
		// for now we just send an email to the store's owner
		let data, eventType;
		// Check if webhook signing is configured.
		if (process.env.STRIPE_WEBHOOK_SECRET) {
				// Retrieve the event by verifying the signature using the raw body and secret.
				let event;
				let signature = req.headers['stripe-signature'];
				try {
						event = stripe.webhooks.constructEvent(
								req.rawBody,
								signature,
								process.env.STRIPE_WEBHOOK_SECRET
						);
				} catch (err) {
						console.log(`⚠️  Webhook signature verification failed.`);
						return res.sendStatus(400);
				}
				data = event.data;
				eventType = event.type;
		} else {
				// Webhook signing is recommended, but if the secret is not configured in `config.js`,
				// we can retrieve the event data directly from the request body.
				data = req.body.data;
				eventType = req.body.type;
		}
		if (eventType === 'payment_intent.succeeded') {
				// Funds have been captured
				// Fulfill any orders, e-mail receipts, etc
				// To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
				console.log('💰 Payment captured!');
		} else if (eventType === 'payment_intent.payment_failed') {
				console.log('❌ Payment failed.');
		}
		res.sendStatus(200);
}

export { sendPublicKey, createPaymentIntent, handleWebhookRespose }
