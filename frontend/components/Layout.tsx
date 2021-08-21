import styles from '@/styles/Layout.module.scss';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';
import Hero from './Hero';
interface LayoutProps {
	title: string;
	keywords?: string;
	description?: string;
	children: ReactNode;
}

const Layout = ({ title, keywords, description, children }: LayoutProps) => {
	const router = useRouter();
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />
			</Head>

			<Header />

			{router.pathname === '/' && <Hero />}

			<main className={styles.container}>{children}</main>

			<Footer />
		</>
	);
};

Layout.defaultProps = {
	title: 'DJ events',
	description: 'Find the latest DJ and other musical events',
	keywords: 'music, dj, edm, events',
};

export default Layout;
