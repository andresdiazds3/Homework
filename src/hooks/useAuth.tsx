import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/config.ts";

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export function useAuth() { 
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Firebase detecta automáticamente si el usuario está autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Usuario autenticado - Firebase guarda lo que le mandemos automáticamente
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName
        });
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
      setError("");
      await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged se encarga de actualizar el estado
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err: any) {
      setError(err.message);
    }
  }

  const register = async (email: string, password: string) => {
    try {
      setError("");
      await createUserWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged se encarga de actualizar el estado
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }

  return { user, login, logout, loading, register, error }
}
