import { BASE_API } from '@env';
import Axios from 'axios';

export default Axios.create({
		baseURL: BASE_API,
		timeout: 500,
});
