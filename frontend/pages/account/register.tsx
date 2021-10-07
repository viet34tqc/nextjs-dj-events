import InputField from '@/components/FormFields/InputField';
import Layout from '@/components/Layout';
import { useAuth } from '@/context/AuthContext';
import styles from '@/styles/AuthForm.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { FaUser } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';

interface RegisterFormInputs {
	username: string;
	email: string;
	password: string;
	password2: string;
}

const RegisterPage = () => {
	const schema = yup.object({
		username: yup.string().required(),
		email: yup.string().email().required(),
		password: yup.string().required(),
		password2: yup.string().required(),
	});
	const {
		register,
		handleSubmit,
		formState: { errors: formErrors },
	} = useForm<RegisterFormInputs>({
		resolver: yupResolver(schema),
	});

	const { register: registerUser } = useAuth();

	const handleFormSubmit = async ({
		username,
		email,
		password,
		password2,
	}: RegisterFormInputs) => {
		if (password !== password2) {
			toast.error('Password does not match');
			return;
		}
		try {
			await registerUser({ username, email, password });
		} catch (e) {
			const message = e.response.data.message;
			message && toast.error(message);
		}
	};

	return (
		<Layout title="User Registration">
			<div className={styles.auth}>
				<h1>
					<FaUser /> Register
				</h1>
				<ToastContainer />
				<form onSubmit={handleSubmit(handleFormSubmit)}>
					<InputField
						name="username"
						label="Username"
						type="text"
						register={register}
						formErrors={formErrors}
					/>
					<InputField
						name="email"
						label="Email Address"
						type="email"
						register={register}
						formErrors={formErrors}
					/>
					<InputField
						name="password"
						label="Password"
						type="password"
						register={register}
						formErrors={formErrors}
					/>
					<InputField
						name="password2"
						label="Confirm Password"
						type="password"
						register={register}
						formErrors={formErrors}
					/>

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

export default RegisterPage;
