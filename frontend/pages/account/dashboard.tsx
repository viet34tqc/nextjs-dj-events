import DashboardEvent from '@/components/DashboardEvent';
import Layout from '@/components/Layout';
import { parseCookie } from '@/helper/helper';
import styles from '@/styles/Dashboard.module.scss';
import eventApi from 'api/eventApi';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { Events } from 'type/event';

interface DashboardPage {
	events: Events;
}

const DashboardPage: NextPage<DashboardPage> = ({ events }) => {
	const deleteEvent = (id: string) => {
		
	};

	return (
		<Layout>
			<div className={styles.dash}>
				<h1>Dashboard</h1>
				<h3>My Events</h3>

				{events.length === 0 && (
					<p
						dangerouslySetInnerHTML={{
							__html: `You haven't had any events yet. Please ${<Link href="/events/add">create one here</Link>}`,
						}}
					/>
				)}

				{events.map((evt) => (
					<DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
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
		},
	};
};

export default DashboardPage;
