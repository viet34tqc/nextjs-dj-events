import authApi from 'api/authApi';
import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		// Get the credentials from the request
		const { identifier, password } = req.body;

		try {
			const data = await authApi.loginBE({ identifier, password });

			// Save the token to the cookie for checking if the user is logged in already.
			res.setHeader(
				'Set-Cookie',
				cookie.serialize('token', data.jwt, {
					httpOnly: true, // If true, the client-side Javascript cannot see the cookie in `document.cookie`, only the server-side can read it. In NextJS, we can only use it on the pages using `getServerSideProps`
					secure: process.env.NODE_ENV !== 'development', // If true, we can only send the cookie if the connection is HTTPS
					maxAge: 60 * 60 * 24 * 7, // 1 week
					sameSite: 'strict',
					path: '/',
				})
			);
			res.status(200).json( data.user );
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
