import type { NextApiRequest, NextApiResponse } from 'next';
const { events } = require('./data.json');

type Data = string | { message: string }; // JSON string.

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (req.method === 'GET') {
		res.status(200).json(events);
	} else {
		res.setHeader('Allow', ['GET']);
		// 405 status code indicates that the request method is known by the server but not support
		res.status(405).json({ message: `Method ${req.method} is not allowed` });
	}
}
