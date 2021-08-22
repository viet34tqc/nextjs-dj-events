import axios from 'axios';
import { API_URL } from '../config';

const axiosClient = axios.create({
	baseURL: API_URL,
	headers: {
		'content-type': 'application/json',
	},
});

axiosClient.interceptors.request.use(async (config) => {
	return config;
});

/* axiosClient.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			return response.data;
		}

		return response;
	},
	(error) => {
		// Handle errors
		throw error;
	}
); */

export default axiosClient;
