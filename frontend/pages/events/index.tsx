import EventItem from '@/components/EventItem';
import Layout from '@/components/Layout';
import Pagination from '@/components/Pagination';
import { PER_PAGE } from '@/config/config';
import eventApi from 'api/eventApi';
import type { GetServerSideProps, NextPage } from 'next';
import { Event, Events } from 'type/event';

interface EventsProps {
	events: Events;
	page: number;
	lastPage: number;
}

const EventsPage: NextPage<EventsProps> = ({
	events,
	page,
	lastPage,
}: EventsProps) => {
	return (
		<Layout>
			<h1>Events</h1>
			{events.length === 0 && <h3>No events to show</h3>}
			{events.map((evt: Event) => (
				<EventItem evt={evt} key={evt.id} />
			))}

			<Pagination page={page} lastPage={lastPage} />
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async function ({
	query: { page = 1 },
}) {
	// Calculate number of start event (offset)
	const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

	// Fetch total count (total events)
	const totalCount = await eventApi.getCount();
	// Calculate last page (the largest possible page)
	const lastPage = Math.ceil(totalCount / PER_PAGE);

	const events = await eventApi.getAll({
		_sort: 'date:ASC',
		_limit: PER_PAGE,
		_start: start,
	});
	return {
		props: {
			events,
			page: +page,
			lastPage,
		},
	};
};

export default EventsPage;
