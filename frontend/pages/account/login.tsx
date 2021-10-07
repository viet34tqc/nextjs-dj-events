import InputField from '@/components/FormFields/InputField';
import Layout from '@/components/Layout';
import { useAuth } from '@/context/AuthContext';
import styles from '@/styles/AuthForm.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUser } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';

interface LoginFormInput {
	email: string;
	password: string;
}

const LoginPage = () => {
	const [error, setError] = useState('');
	const schema = yup.object({
		email: yup.string().email().required(),
		password: yup.string().required(),
	});
	const {
		register,
		handleSubmit,
		formState: { errors: formErrors },
	} = useForm<LoginFormInput>({
		resolver: yupResolver(schema),
	});

	const { login } = useAuth();

	const handleFormSubmit = async ({ email, password }: LoginFormInput) => {
		try {
			await login({ identifier: email, password });
		} catch (e) {
			const message = e.response.data.message;
			message && toast.error(message);
		}
	};

	return (
		<Layout title="User Login">
			<div className={styles.auth}>
				<h1>
					<FaUser /> Log In
				</h1>
				<ToastContainer />
				<form onSubmit={handleSubmit(handleFormSubmit)}>
					<InputField
						name="email"
						label="Email Address"
						register={register}
						type="email"
						formErrors={formErrors}
					/>
					<InputField
						name="password"
						label="Password"
						register={register}
						type="password"
						formErrors={formErrors}
					/>

					<input type="submit" value="Login" className="btn" />
				</form>

				<p>
					Don&apos;t have an account?{' '}
					<Link href="/account/register">Register</Link>
				</p>
			</div>
		</Layout>
	);
};

export default LoginPage;
