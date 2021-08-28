import Layout from '@/components/Layout';
import styles from '@/styles/AuthForm.module.scss';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const LoginPage = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (password !== password2) {
			toast.error('Password does not match');
			return;
		}
	};

	return (
		<Layout title="User Registration">
			<div className={styles.auth}>
				<h1>
					<FaUser /> Register
				</h1>
				<ToastContainer />
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="username">Username</label>
						<input
							type="text"
							id="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="email">Email Address</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="password2">Confirm Password</label>
						<input
							type="password"
							id="password2"
							value={password2}
							onChange={(e) => setPassword2(e.target.value)}
						/>
					</div>

					<input type="submit" value="Register" className="btn" />
				</form>

				<p>
					Already have an account?&nbsp;
					<Link href="/account/login">Login</Link>
				</p>
			</div>
		</Layout>
	);
};

export default LoginPage;
