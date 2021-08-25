import EventItem from '@/components/EventItem';
import Layout from '@/components/Layout';
import eventApi from 'api/eventApi';
import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { Event, Events } from 'type/event';

interface HomeProps {
	events: Events;
}

const Home: NextPage<HomeProps> = ({ events }) => {
	return (
		<Layout>
			<h1>Upcoming events</h1>
			{events.length === 0 && <h3>No events to show</h3>}
			{events.map((evt: Event) => (
				<EventItem evt={evt} key={evt.id} />
			))}

			{events.length > 0 && (
				<Link href="/events">
					<a className="btn-secondary">View all events</a>
				</Link>
			)}
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async function () {
	const params = {
		_limit: 3,
	};
	const events = await eventApi.getAll(params);
	return {
		props: {
			events,
		},
		// There is a drawback with getStaticProps
		// If we go to events page and add an event
		// Then we comeback to the homepage, the events on the homepage are not updated
		// Because they are merely updated at build time.
		revalidate: 1, // 1s
	};
};

export default Home;
