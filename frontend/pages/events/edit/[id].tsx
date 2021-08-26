import Layout from '@/components/Layout';
import styles from '@/styles/EditForm.module.scss';
import eventApi from 'api/eventApi';
import moment from 'moment';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import { ParsedUrlQuery } from 'querystring';
import { FormEvent, useState } from 'react';
import { FaImage } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Event } from 'type/event';

interface EditEventPageProps {
	evt: Event;
}

const EditEventPage: NextPage<EditEventPageProps> = ({ evt }) => {
	const [values, setValues] = useState({
		name: evt.name,
		performers: evt.performers,
		venue: evt.venue,
		address: evt.address,
		date: evt.date,
		time: evt.time,
		description: evt.description,
	});

	const [imagePreview, setImagePreview] = useState(
		evt?.image?.formats?.thumbnail?.url
	);

	const router = useRouter();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const hasEmptyFields = Object.values(values).some((val) => val === '');
		if (hasEmptyFields) {
			toast.error('Please fill in all the fields');
		}

		try {
			const event = await eventApi.edit(evt.id, values);
			toast.success('Successfully edit');
			setTimeout(() => {
				router.push(`/events/${event.slug}`);
			}, 5000);
		} catch (error) {
			toast.error(error.message);
		}
	};

	const handleInputChange = (
		e: FormEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target as HTMLInputElement;
		setValues({ ...values, [name]: value });
	};

	return (
		<Layout title="Edit event">
			<h1>Edit event</h1>
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
							value={moment(values.date).format('yyyy-MM-DD')}
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

				<input type="submit" value="Update Event" className="btn" />
			</form>

			<h2>Event Image</h2>
			{imagePreview ? (
				<>
					<Image src={imagePreview} height={100} width={170} alt={evt.slug} />
					<div>
						<button className="btn btn-secondary">
							<FaImage /> Edit image
						</button>
					</div>
				</>
			) : (
				<div>
					<p>No image uploaded</p>
				</div>
			)}
		</Layout>
	);
};

interface Params extends ParsedUrlQuery {
	id: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const params = context.params as Params;
	const evt = await eventApi.getById(params.id);

	return {
		props: {
			evt,
		},
	};
};

export default EditEventPage;
