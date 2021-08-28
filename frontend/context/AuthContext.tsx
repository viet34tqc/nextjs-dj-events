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
	const login = ({ email: identifier, password }: UserLogin) => {
		console.log(identifier, password);
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
