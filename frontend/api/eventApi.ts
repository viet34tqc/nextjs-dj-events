import { Event, Events } from 'type/event';
import axiosClient from './axiosClient';

const eventApi = {
	getAll: (params?: {}) => {
		params = { ...params, _sort: 'date:ASC' };
		const url = '/events';
		return axiosClient.get<Events>(url, { params }).then((res) => res.data);
	},

	get: (slug: string) => {
		const url = `/events/?slug=${slug}`;
		return axiosClient.get<Events>(url).then((res) => res.data[0]);
	},
};

export default eventApi;
