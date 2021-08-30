import Layout from '@/components/Layout';
import styles from '@/styles/EventPage.module.scss';
import eventApi from 'api/eventApi';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import { Event } from 'type/event';

interface EventPageProps {
	evt: Event;
}

const EventPage: NextPage<EventPageProps> = ({ evt }) => {
	return (
		<Layout>
			<div className={styles.event}>
				<span>
					{new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
				</span>

				<h1>{evt.name}</h1>

				{evt.image && (
					<div className={styles.image}>
						<Image
							src={evt?.image?.formats?.medium?.url}
							width={960}
							height={600}
							alt=""
						/>
					</div>
				)}

				<h3>Performers: </h3>
				<p>{evt.performers}</p>

				<h3>Description</h3>
				<p>{evt.description}</p>

				<h3>Venue: {evt.venue}</h3>
				<p>{evt.address}</p>

				<Link href="/events">
					<a className={styles.back}>{'<'} Go Back</a>
				</Link>
			</div>
		</Layout>
	);
};

interface Params extends ParsedUrlQuery {
	slug: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
	const params = context.params as Params;
	const evt = await eventApi.get(params.slug);
	return {
		props: {
			evt,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const events = await eventApi.getAll();
	// paths is an array of params object. This object must have `slug` property which is the name of this file.
	const paths = events.map((evt) => ({
		params: { slug: evt.slug },
	}));
	return {
		paths,
		fallback: false, // If the slug isn't found, return 404.
	};
};

export default EventPage;
