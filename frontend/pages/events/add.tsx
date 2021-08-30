import Layout from '@/components/Layout';
import { parseCookie } from '@/helper/helper';
import styles from '@/styles/EditForm.module.scss';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { FormEvent, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import eventApi from '../../api/eventApi';

interface AddPageProps {
	token: string;
}

const AddPage: NextPage<AddPageProps> = ({token}) => {
	const [values, setValues] = useState({
		name: '',
		performers: '',
		venue: '',
		address: '',
		date: '',
		time: '',
		description: '',
	});

	const router = useRouter();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const hasEmptyFields = Object.values(values).some((val) => val === '');
		if (hasEmptyFields) {
			toast.error('Please fill in all the fields');
		}

		try {
			const evt = await eventApi.create(values, token);
			toast.success('Successfully created');
			setTimeout(() => {
				router.push(`/events/${evt.slug}`);
			}, 2000);
		} catch (error) {
			if (
				error?.response?.status === 401 ||
				error?.response?.status === 403
			) {
				toast.error('No token');
			} else {
				toast.error(error.message);
			}
		}
	};

	const handleInputChange = (
		e: FormEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target as HTMLInputElement;
		setValues({ ...values, [name]: value });
	};

	return (
		<Layout title="Add new event">
			<h1>Add event</h1>
			<ToastContainer />

			<form onSubmit={handleSubmit} className={styles.editForm}>
				<div className={styles.grid}>
					<div>
						<label htmlFor="name">Event Name</label>
						<input
							type="text"
							id="name"
							name="name"
							value={values.name}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="performers">Performers</label>
						<input
							type="text"
							name="performers"
							id="performers"
							value={values.performers}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="venue">Venue</label>
						<input
							type="text"
							name="venue"
							id="venue"
							value={values.venue}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="address">Address</label>
						<input
							type="text"
							name="address"
							id="address"
							value={values.address}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="date">Date</label>
						<input
							type="date"
							name="date"
							id="date"
							value={values.date}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="time">Time</label>
						<input
							type="text"
							name="time"
							id="time"
							value={values.time}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div>
					<label htmlFor="description">Event Description</label>
					<textarea
						name="description"
						id="description"
						value={values.description}
						onChange={handleInputChange}
					></textarea>
				</div>

				<input type="submit" value="Add Event" className="btn" />
			</form>
		</Layout>
	);
};


export const getServerSideProps: GetServerSideProps = async (context) => {
	const { token } = parseCookie(context.req);

	return {
		props: {
			token,
		},
	};
};

export default AddPage;
