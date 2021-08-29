import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		res.setHeader(
			'Set-Cookie',
			cookie.serialize('token', '', {
				httpOnly: true,
				secure: process.env.NODE_ENV !== 'development',
				expires: new Date(0),
				sameSite: 'strict',
				path: '/',
			})
		);
		res.status(200).json({ message: 'Success' });
	} else {
		res.setHeader('Allow', ['POST']);
		// 405 status code indicates that the request method is known by the server but not supported
		res.status(405).json({ message: `Method ${req.method} is not allowed` });
	}
}
