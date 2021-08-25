import EventItem from '@/components/EventItem';
import Layout from '@/components/Layout';
import eventApi from 'api/eventApi';
import type { GetStaticProps, NextPage } from 'next';
import { Event, Events } from 'type/event';

interface EventsProps {
	events: Events;
}

const EventsPage: NextPage<EventsProps> = ({ events }: EventsProps) => {
	return (
		<Layout>
			<h1>Events</h1>
			{events.length === 0 && <h3>No events to show</h3>}
			{events.map((evt: Event) => (
				<EventItem evt={evt} key={evt.id} />
			))}
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async function () {
	const events = await eventApi.getAll();
	return {
		props: {
			events,
		},
		// There is a drawback with getStaticProps
		// If we go to events page and add an event
		// Then we comeback to the homepage, the events on the homepage are not updated
		// Because they are merely updated on build time.
		revalidate: 1, // 1s
	};
};

export default EventsPage;
