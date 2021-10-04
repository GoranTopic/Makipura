import express from 'express';
import { isAuthenticated } from "../auth/authentication.js";
import { sendPublicKey, createPaymentIntent, handleWebhookRespose } from '../payment/payments.js';

const paymentRouter = express.Router();

const calculateTotal = (items) => {
		// caculates the toal amount for the items wanting to buy
		return 1000; // fro now just return tem dollars
}

paymentRouter.route('/config')
		.get(	
				//isAuthenticated,
				sendPublicKey,
		);

paymentRouter.route('/create-payment-intent')
		.post(
				//isAuthenticated,
				createPaymentIntent,
		);


paymentRouter.route('/Webhook')
		.post(
				handleWebhookRespose,
		)

export default paymentRouter
