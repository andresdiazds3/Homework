import { createContext, type ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";

type AuthContextValue = {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  loading: boolean;
  error: string;
}

type AuthProviderProps = {
	children: ReactNode;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
	const { user, login, logout, loading, register, error } = useAuth();

	return (
		<AuthContext.Provider value={{ user, login, logout, loading, register, error }}>
			{children}
		</AuthContext.Provider>
	);
}
