import authApi from 'api/authApi';
import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		// Check if the header has the cookie
		if (!req.headers.cookie) {
			return;
		}
		const { token } = cookie.parse(req.headers.cookie);
		if (!token) {
			res.status(403).json({ message: 'Not Authorized' });
		}	
		try {
			const user = authApi.checkUserLoggedIn(token);
			res.status(200).json({ user });
		} catch (error) {
			res.status(403).json({ message: 'User forbidden' });
		}
	} else {
		res.setHeader('Allow', ['POST']);
		// 405 status code indicates that the request method is known by the server but not supported
		res.status(405).json({ message: `Method ${req.method} is not allowed` });
	}
}
