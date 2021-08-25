import styles from '@/styles/EventItem.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { Event } from 'type/event';

interface EventItem {
	evt: Event;
}

const EventItem = ({ evt }: EventItem) => {
	return (
		<article className={styles.event}>
			<div className={styles.img}>
				{/* Width and Height are required props */}
				<Image
					width={170}
					height={100}
					src={
						evt?.image?.formats?.thumbnail?.url || '/images/event-default.png'
					}
					alt={evt.name}
				/>
			</div>

			<div className={styles.info}>
				<span>
					{new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
				</span>
				<h3>{evt.name}</h3>
			</div>

			<div className={styles.link}>
				<Link href={`/events/${evt.slug}`}>
					<a className="btn">Details</a>
				</Link>
			</div>
		</article>
	);
};

export default EventItem;
