import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  type User as FirebaseUser,
} from "firebase/auth";
import { auth } from "../firebase/config.ts";

interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

const getFirebaseErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unexpected error with Firebase auth.";
};

const mapFirebaseUser = (currentUser: FirebaseUser): AuthUser => ({
  uid: currentUser.uid,
  email: currentUser.email,
  displayName: currentUser.displayName,
});

export function useAuth() { 
  
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Firebase detecta automáticamente si el usuario está autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(mapFirebaseUser(currentUser));
      } else {
        // Usuario no autenticado
        setUser(null);
      }
      setLoading(false);
    });

    // Limpia el listener cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged se encarga de actualizar el estado
    } catch (error) {
      const message = getFirebaseErrorMessage(error);
      setError(message);
      throw new Error(message);
    }
  }

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      setError(getFirebaseErrorMessage(error));
    }
  }

  const register = async (email: string, password: string) => {
    try {
      setError(null);
      await createUserWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged se encarga de actualizar el estado
    } catch (error) {
      const message = getFirebaseErrorMessage(error);
      setError(message);
      throw new Error(message);
    }
  }

  return { user, login, logout, loading, register, error }
}
