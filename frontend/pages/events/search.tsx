import EventItem from '@/components/EventItem';
import Layout from '@/components/Layout';
import eventApi from 'api/eventApi';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import qs from 'qs';
import { Event, Events } from 'type/event';

interface EventsProps {
	events: Events;
}

const SearchPage: NextPage<EventsProps> = ({ events }: EventsProps) => {
	const router = useRouter();
	return (
		<Layout title="Search Results">
			<Link href="/events">Go back</Link>
			<h1>Search Results for {router.query.term}</h1>
			{events.length === 0 && <h3>No events to show</h3>}
			{events.map((evt: Event) => (
				<EventItem evt={evt} key={evt.id} />
			))}
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async function ({
	query: { term },
}) {
	const queryString = qs.stringify({
		_where: {
			_or: [
				{ name_contains: term },
				{ performers_contains: term },
				{ description_contains: term },
				{ venue_contains: term },
			],
		},
	});
	const events = await eventApi.getAll({}, queryString);
	return {
		props: {
			events,
		},
	};
};

export default SearchPage;
