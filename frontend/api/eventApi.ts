import { Event, Events } from 'type/event';
import { axiosBEClient } from './axiosClient';

const eventApi = {
	getAll: (params?: {}, queryString = '') => {
		const url = `/events?${queryString}`;
		return axiosBEClient.get<Events>(url, { params }).then((res) => res.data);
	},
	get: (slug: string) => {
		const url = `/events/?slug=${slug}`;
		return axiosBEClient.get<Events>(url).then((res) => res.data[0]);
	},
	getByUser: (token: string) => {
		const url = `/events/me`;
		return axiosBEClient
			.get<Events>(url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => res.data);
	},
	getCount: () => {
		const url = '/events/count';
		return axiosBEClient.get<number>(url).then((res) => res.data);
	},
	getById: (id: string) => {
		const url = `/events/${id}`;
		return axiosBEClient.get<Event>(url).then((res) => res.data);
	},
	create: (params: {}, token: string) => {
		const url = `/events`;
		return axiosBEClient
			.post<Event>(url, params, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => res.data);
	},
	delete: (id: string, token) => {
		const url = `/events/${id}`;
		return axiosBEClient
			.delete<Event>(url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => res.data);
	},
	edit: (id: string, params: {}, token: string) => {
		const url = `/events/${id}`;
		return axiosBEClient
			.put<Event>(url, params, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => res.data);
	},
	upload: (params: {}, token: string) => {
		const url = '/upload';
		return axiosBEClient
			.post(url, params, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => res.data);
	},
};

export default eventApi;
