import authApi from 'api/authApi';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		// Get the credentials from the request
		const { identifier, password } = req.body;

		// Get the token first
		try {
			const data = await authApi.getToken({ identifier, password });
			res.status(200).json({ user: data.user });
		} catch (error) {
			res
				.status(error.response.status)
				.json({ message: error.response.data.message[0].messages[0].message });
		}
	} else {
		res.setHeader('Allow', ['POST']);
		// 405 status code indicates that the request method is known by the server but not supported
		res.status(405).json({ message: `Method ${req.method} is not allowed` });
	}
}
