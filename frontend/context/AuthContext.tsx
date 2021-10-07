import authApi from 'api/authApi';
import { useRouter } from 'next/dist/client/router';
import { createContext, FC, useContext, useEffect, useState } from 'react';
import { User, UserLogin } from 'type/user';

interface IAuthContext {
	user: User | null;
	error: string | null;
	register: (user: User) => void;
	login: (user: UserLogin) => void;
	logout: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

const AuthContextProvider: FC = ({ children }) => {
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);

	const router = useRouter();

	useEffect(() => {
		checkUserLoggedIn();
	}, []);

	// Register user
	const register = async (user: User) => {
		const data = await authApi.registerFE(user);
		setUser(data);
		router.push('/account/dashboard');
	};

	// Login user
	// Strapi take the username or email as identifier, so we need to rename it.
	const login = async ({ identifier, password }: UserLogin) => {
		const user = await authApi.loginFE({ identifier, password });
		setUser(user);
		router.push('/account/dashboard');
	};

	// Logout user
	const logout = async () => {
		try {
			await authApi.logout();
			setUser(null);
			router.push('/');
		} catch (e) {
			const message = e.response.data.message;
			setError(message);
			setError(null);
		}
	};

	// Check if user is logged in
	const checkUserLoggedIn = async () => {
		try {
			const user = await authApi.getLoggedInUser();
			setUser(user);
		} catch (e) {
			setUser(null);
		}
	};

	return (
		<AuthContext.Provider value={{ user, error, register, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;

export const useAuth = () => {
	return useContext(AuthContext) as IAuthContext; // Cast type to IAuthContext so we can destructure context object when use this function
};
