import { createContext, type ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";

type AuthContextValue = {
	user: unknown;
	login: (userData: unknown) => void;
	logout: () => void;
};

type AuthProviderProps = {
	children: ReactNode;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
	const { user, login, logout } = useAuth();

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}
