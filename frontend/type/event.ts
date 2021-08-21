export interface Event {
	id: string;
	name: string;
	slug: string;
	venue: string;
	address: string;
	performers: string;
	date: string;
	time: string;
	description: string;
	image: string;
}

export type Events = Event[];
