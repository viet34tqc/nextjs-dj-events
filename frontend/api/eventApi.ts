import { Event, Events } from 'type/event';
import axiosClient from './axiosClient';

const eventApi = {
	getAll: (params?: {}) => {
		const url = '/api/events';
		return axiosClient.get<Events>(url, { params }).then(res => res.data);
	},

	get: (slug: string) => {
		const url = `/api/events/${slug}`;
		return axiosClient.get<Event>(url).then( res => res.data );
	},
};

export default eventApi;
