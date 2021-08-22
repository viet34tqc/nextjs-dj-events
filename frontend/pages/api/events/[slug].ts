import type { NextApiRequest, NextApiResponse } from 'next';
import { Event } from 'type/event';
const { events } = require('./data.json');

type Data = string | { message: string };

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	// We name the variable 'evt' instead of 'event' to make it less confuse
	const evt = events.filter((ev: Event) => ev.slug === req.query.slug);

	if (req.method === 'GET') {
		res.status(200).json(evt);
	} else {
		res.setHeader('Allow', ['GET']);
		// 405 status code indicates that the request method is known by the server but not support
		res.status(405).json({ message: `Method ${req.method} is not allowed` });
	}
}
