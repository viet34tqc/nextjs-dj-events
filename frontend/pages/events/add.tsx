import Layout from '@/components/Layout';
import styles from '@/styles/EditForm.module.scss';
import { FormEvent, useState } from 'react';

const Add = () => {
	const [values, setValues] = useState({
		name: '',
		performers: '',
		venue: '',
		address: '',
		date: '',
		time: '',
		description: '',
	});

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log( values );
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

export default Add;
