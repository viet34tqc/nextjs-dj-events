import styles from '@/styles/Header.module.scss';
import Link from 'next/link';
import { FaSignInAlt } from 'react-icons/fa';
import SearchForm from './SearchForm';

const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<Link href="/">
					<a>DJ Events</a>
				</Link>
			</div>

			<SearchForm />

			<nav>
				<ul>
					<li>
						<Link href="/events">
							<a>Events</a>
						</Link>
					</li>
					<li>
						<Link href="/account/login">
							<a className="btn-icon btn-secondary">
								<FaSignInAlt /> Login
							</a>
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
