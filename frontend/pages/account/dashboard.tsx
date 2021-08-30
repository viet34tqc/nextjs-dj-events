import DashboardEvent from '@/components/DashboardEvent';
import Layout from '@/components/Layout';
import { parseCookie } from '@/helper/helper';
import styles from '@/styles/Dashboard.module.scss';
import eventApi from 'api/eventApi';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Events } from 'type/event';

interface DashboardPage {
	events: Events;
	token: string;
}

const DashboardPage: NextPage<DashboardPage> = ({ events, token }) => {
	const router = useRouter();

	const handleDelete = async (id: string) => {
		if (confirm('Are you sure?')) {
			try {
				await eventApi.delete(id, token);
				toast.success('Successfully delete');
				setTimeout(() => {
					router.reload();
				}, 2000);
			} catch (error) {
				toast.error(error.message);
			}
		}
	};

	return (
		<Layout>
			<div className={styles.dash}>
				<h1>Dashboard</h1>
				<h3>My Events</h3>
				<ToastContainer />

				{events.length === 0 && (
					<p>
						You haven&apos;t had any events yet. Please
						<Link href="/events/add">
							<a> create one here</a>
						</Link>
					</p>
				)}

				{events.map((evt) => (
					<DashboardEvent key={evt.id} evt={evt} handleDelete={handleDelete} />
				))}
			</div>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const { token } = parseCookie(req);
	if (!token) {
		return {
			props: {
				events: [],
			},
		};
	}
	const events = await eventApi.getByUser(token);
	return {
		props: {
			events,
			token,
		},
	};
};

export default DashboardPage;
