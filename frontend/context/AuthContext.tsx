import authApi from 'api/authApi';
import { createContext, FC, useContext, useState } from 'react';
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

	// Register user
	const register = (user: User) => {
		console.log(user);
	};

	// Login user
	// Strapi take the username or email as identifier, so we need to rename it.
	const login = async ({ identifier, password }: UserLogin) => {
		try {
			const res = await authApi.login({ identifier, password });
		} catch (e) {
			const message = e.response.data.message;
			setError(message);
			// If the message from the request is the same, like submiting without any credentials two times.
			// Then the login page cannot re-render and the toast won't work.
			// Reset the error here to refresh the state of the context so that other child components can re-render
			setError(null);
		}
	};

	// Logout user
	const logout = () => {
		console.log('Logout');
	};

	// Check if user is logged in
	const checkUserLoggedIn = (user: User) => {
		console.log('Check');
	};

	return (
		<AuthContext.Provider value={{ user, error, register, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;

export const useAuth = () => {
	return useContext(AuthContext) as IAuthContext;
};
