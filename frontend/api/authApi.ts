import { UserLogin } from 'type/user';
import { axiosBEClient, axiosFEClient } from './axiosClient';

const authApi = {	
	getToken: (params: UserLogin) => {
		const url = '/auth/local';
		return axiosBEClient.post(url, params).then((res) => res.data);
	},
	login: (params: UserLogin) => {
		const url = '/api/login';
		return axiosFEClient.post(url, params).then((res) => res.data);
	},
};

export default authApi;
