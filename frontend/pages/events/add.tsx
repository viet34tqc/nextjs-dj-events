import Layout from '@/components/Layout';
import { parseCookie } from '@/helper/helper';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import eventApi from '../../api/eventApi';
import {
	AddEditEventForm,
	AddEditFormInput,
} from './components/AddEditEventForm';

interface AddPageProps {
	token: string;
}

const AddPage: NextPage<AddPageProps> = ({ token }) => {
	const defaultValues = {
		name: '',
		performers: '',
		venue: '',
		address: '',
		date: '',
		time: '',
		description: '',
	};
	const router = useRouter();

	const handleSubmit = async (values: AddEditFormInput) => {
		try {
			const evt = await eventApi.create(values, token);
			toast.success('Successfully created', {
				onClose: () => {
					router.push(`/events/${evt.slug}`);
				},
			});
		} catch (error) {
			if (error?.response?.status === 401 || error?.response?.status === 403) {
				toast.error('No token');
			} else {
				toast.error(error.message);
			}
		}
	};

	return (
		<Layout title="Add new event">
			<h1>Add event</h1>
			<ToastContainer autoClose={3000} />

			<AddEditEventForm onSubmit={handleSubmit} defaultValues={defaultValues} />
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
