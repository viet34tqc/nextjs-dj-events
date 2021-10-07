import Layout from '@/components/Layout';
import { parseCookie } from '@/helper/helper';
import eventApi from 'api/eventApi';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Event } from 'type/event';
import {
	AddEditEventForm,
	AddEditFormInput,
} from '../components/AddEditEventForm';
import ImagePreview from '../components/ImagePreview';

interface EditEventPageProps {
	evt: Event;
	token: string;
}

const EditEventPage: NextPage<EditEventPageProps> = ({ evt, token }) => {
	const defaultValues = {
		name: evt.name,
		performers: evt.performers,
		venue: evt.venue,
		address: evt.address,
		date: evt.date,
		time: evt.time,
		description: evt.description,
	};

	const router = useRouter();

	const handleSubmit = async (values: AddEditFormInput) => {
		try {
			const event = await eventApi.edit(evt.id, values, token);
			toast.success('Successfully edit', {
				onClose: () => {
					router.push(`/events/${event.slug}`);
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
		<Layout title="Edit event">
			<h1>Edit event</h1>
			<ToastContainer autoClose={3000} />

			<AddEditEventForm onSubmit={handleSubmit} defaultValues={defaultValues} />

			<ImagePreview evt={evt} token={token} />
		</Layout>
	);
};

interface Params extends ParsedUrlQuery {
	id: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { token } = parseCookie(context.req);
	const params = context.params as Params;
	const evt = await eventApi.getById(params.id);

	return {
		props: {
			evt,
			token,
		},
	};
};

export default EditEventPage;
