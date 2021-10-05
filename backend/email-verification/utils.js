import crypto from 'crypto';
import { token_length } from './config.js';

const genRandomCode = () => {
		return "M-" + crypto
				.randomBytes(token_length)
				.toString('hex')
				.slice(0, token_length);
}

export { genRandomCode };
