import { User, UserLogin } from 'type/user';
import { axiosBEClient, axiosFEClient } from './axiosClient';

const authApi = {
	loginBE: (params: UserLogin) => {
		const url = '/auth/local';
		return axiosBEClient.post(url, params).then((res) => res.data);
	},
	loginFE: (params: UserLogin) => {
		const url = '/api/login';
		return axiosFEClient.post(url, params).then((res) => res.data);
	},
	registerBE: (params: User) => {
		const url = '/auth/local/register';
		return axiosBEClient.post(url, params).then((res) => res.data);
	},
	registerFE: (params: User) => {
		const url = '/api/register';
		return axiosFEClient.post(url, params).then((res) => res.data);
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

	logout: () => {
		const url = '/api/logout';
		return axiosFEClient.post(url).then((res) => res.data);
	},
};

export default authApi;
