import styles from '@/styles/Header.module.scss';
import Link from 'next/link';

const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<Link href="/">
					<a>DJ Events</a>
				</Link>
			</div>

			<nav>
				<ul>
					<li>
						<Link href="/events">
							<a>Events</a>
						</Link>
						<Link href="/about">
							<a>About</a>
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
