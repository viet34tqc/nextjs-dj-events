import { useAuth } from '@/context/AuthContext';
import styles from '@/styles/Header.module.scss';
import Link from 'next/link';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import SearchForm from './SearchForm';

const Header = () => {
	const { user, logout } = useAuth();
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

					{user ? (
						// Logged in
						<>
							<li>
								<Link href="/events/add">
									<a>Add Event</a>
								</Link>
							</li>
							<li>
								<Link href="/account/dashboard">
									<a>Dashboard</a>
								</Link>
							</li>
							<li>
								<button
									className="btn-icon btn-secondary"
									onClick={() => logout()}
								>
									<FaSignOutAlt /> Logout
								</button>
							</li>
						</>
					) : (
						// Logged out
						<li>
							<Link href="/account/login">
								<a className="btn-icon btn-secondary">
									<FaSignInAlt /> Login
								</a>
							</Link>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
