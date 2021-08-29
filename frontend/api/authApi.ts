import { UserLogin } from 'type/user';
import { axiosBEClient, axiosFEClient } from './axiosClient';

const authApi = {
	getToken: (params: UserLogin) => {
		const url = '/auth/local';
		return axiosBEClient.post(url, params).then((res) => res.data);
	},
	checkUserLoggedIn: (token: string) => {
		const url = '/users/me';
		return axiosBEClient
			.get(url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => res.data);
	},
	getLoggedInUser: () => {
		const url = '/api/user';
		return axiosFEClient.get(url).then((res) => res.data);
	},
	login: (params: UserLogin) => {
		const url = '/api/login';
		return axiosFEClient.post(url, params).then((res) => res.data);
	},
};

export default authApi;
