import { Event, Events } from 'type/event';
import axiosClient from './axiosClient';

const eventApi = {
	getAll: (params?: {}, queryString = '') => {
		const url = `/events?${queryString}`;
		return axiosClient.get<Events>(url, { params }).then((res) => res.data);
	},
	get: (slug: string) => {
		const url = `/events/?slug=${slug}`;
		return axiosClient.get<Events>(url).then((res) => res.data[0]);
	},
	create: (params: {}) => {
		const url = `/events`;
		return axiosClient.post<Event>(url, params).then((res) => res.data);
	},
};

export default eventApi;
