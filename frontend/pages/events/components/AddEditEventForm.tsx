import InputField from '@/components/FormFields/InputField';
import TextareaField from '@/components/FormFields/TextareaField';
import styles from '@/styles/AddEditEventForm.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

interface AddEditEventFormProps {
	onSubmit: (data: AddEditFormInput) => void;
	defaultValues: AddEditFormInput;
}

export interface AddEditFormInput {
	name: string;
	performers: string;
	venue: string;
	address: string;
	date: string;
	time: string;
	description: string;
}

export const AddEditEventForm = ({
	onSubmit,
	defaultValues,
}: AddEditEventFormProps) => {
	const schema = yup.object({
		name: yup.string().required(),
		performers: yup.string().required(),
		venue: yup.string().required(),
		address: yup.string().required(),
		date: yup.string().required(),
		time: yup.string().required(),
		description: yup.string().required(),
	});

	const {
		register,
		handleSubmit,
		formState: { errors: formErrors, isSubmitting },
	} = useForm<AddEditFormInput>({
		resolver: yupResolver(schema),
		defaultValues,
	});

	const handleFormSubmit = (data: AddEditFormInput) => {
		onSubmit(data);
	};

	return (
		<form
			onSubmit={handleSubmit(handleFormSubmit)}
			className={styles.addEditForm}
		>
			<div className={styles.grid}>
				<InputField
					name="name"
					label="Event Name"
					type="text"
					register={register}
					formErrors={formErrors}
				/>
				<InputField
					name="performers"
					label="Performers"
					type="text"
					register={register}
					formErrors={formErrors}
				/>
				<InputField
					name="venue"
					label="Venue"
					type="text"
					register={register}
					formErrors={formErrors}
				/>
				<InputField
					name="address"
					label="Address"
					type="text"
					register={register}
					formErrors={formErrors}
				/>
				<InputField
					name="date"
					label="Date"
					type="date"
					register={register}
					formErrors={formErrors}
				/>
				<InputField
					name="time"
					label="Date"
					type="text"
					register={register}
					formErrors={formErrors}
				/>
			</div>
			<TextareaField
				name="description"
				label="Event Description"
				type="text"
				register={register}
				formErrors={formErrors}
			/>

			<button type="submit" className="btn" disabled={isSubmitting}>
				Update Event
			</button>
		</form>
	);
};
