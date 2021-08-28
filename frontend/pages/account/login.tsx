import Layout from '@/components/Layout';
import { useAuth } from '@/context/AuthContext';
import styles from '@/styles/AuthForm.module.scss';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const {login, error} = useAuth();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		login({email, password})
	};

	return (
		<Layout title="User Login">
			<div className={styles.auth}>
				<h1>
					<FaUser /> Log In
				</h1>
				<ToastContainer />
				<form onSubmit={handleSubmit}>
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

					<input type="submit" value="Login" className="btn" />
				</form>

				<p>
					Don&apos;t have an account? <Link href="/account/register">Register</Link>
				</p>
			</div>
		</Layout>
	);
};

export default LoginPage;
