import { createContext, type ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";

type AuthContextValue = {
  user: unknown;
  login: (userData: unknown) => void;
  logout: () => void;
  loading: boolean; // 👈
}

type AuthProviderProps = {
	children: ReactNode;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
	const { user, login, logout, loading } = useAuth();

	return (
		<AuthContext.Provider value={{ user, login, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
}
