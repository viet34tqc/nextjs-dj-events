import axios from 'axios';
import qs from 'qs';
import { API_URL, NEXT_URL } from '../config/config';

const axiosBEClient = axios.create({
	baseURL: API_URL,
	headers: {
		'content-type': 'application/json',
	},
	paramsSerializer: (params) => qs.stringify(params),
});

axiosBEClient.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		throw error;
	}
);

axiosBEClient.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		throw error;
	}
);

const axiosFEClient = axios.create({
	baseURL: NEXT_URL,
	headers: {
		'content-type': 'application/json',
	},
	paramsSerializer: (params) => qs.stringify(params),
});

axiosFEClient.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		throw error;
	}
);

axiosFEClient.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		throw error;
	}
);

export { axiosBEClient, axiosFEClient };
