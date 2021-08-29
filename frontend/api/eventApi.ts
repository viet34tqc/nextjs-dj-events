import { Event, Events } from 'type/event';
import {axiosBEClient} from './axiosClient';

const eventApi = {
	getAll: (params?: {}, queryString = '') => {
		const url = `/events?${queryString}`;
		return axiosBEClient.get<Events>(url, { params }).then((res) => res.data);
	},
	get: (slug: string) => {
		const url = `/events/?slug=${slug}`;
		return axiosBEClient.get<Events>(url).then((res) => res.data[0]);
	},
	getCount: () => {
		const url = '/events/count';
		return axiosBEClient.get<number>(url).then((res) => res.data);
	},
	getById: (id: string) => {
		const url = `/events/${id}`;
		return axiosBEClient.get<Event>(url).then((res) => res.data);
	},
	create: (params: {}) => {
		const url = `/events`;
		return axiosBEClient.post<Event>(url, params).then((res) => res.data);
	},
	delete: (id: string) => {
		const url = `/events/${id}`;
		return axiosBEClient.delete<Event>(url).then((res) => res.data);
	},
	edit: (id: string, params: {}) => {
		const url = `/events/${id}`;
		return axiosBEClient.put<Event>(url, params).then((res) => res.data);
	},
	upload: (formData: FormData) => {
		const url = '/upload';
		return axiosBEClient.post(url, formData).then((res) => res.data);
	},
};

export default eventApi;
