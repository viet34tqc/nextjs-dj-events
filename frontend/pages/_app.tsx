import AuthContextProvider from '@/context/AuthContext';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AuthContextProvider>
			<Component {...pageProps} />;
		</AuthContextProvider>
	);
}
export default MyApp;
