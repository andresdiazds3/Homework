import { useEffect, useState } from 'react'
import { FirebaseError } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  type User as FirebaseUser,
} from 'firebase/auth'
import { auth } from '../firebase/config.ts'

interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
}

const firebaseAuthErrorMap: Record<string, string> = {
  'auth/invalid-credential': 'Correo o contrasena incorrectos.',
  'auth/invalid-email': 'El correo no tiene un formato valido.',
  'auth/user-not-found': 'No existe una cuenta con ese correo.',
  'auth/wrong-password': 'La contrasena es incorrecta.',
  'auth/email-already-in-use': 'Este correo ya esta registrado.',
  'auth/weak-password': 'La contrasena debe tener al menos 6 caracteres.',
  'auth/network-request-failed': 'Error de red. Verifica tu conexion e intenta de nuevo.',
  'auth/too-many-requests': 'Demasiados intentos. Espera un momento e intenta de nuevo.',
}

const getFirebaseErrorMessage = (error: unknown): string => {
  if (error instanceof FirebaseError) {
    return firebaseAuthErrorMap[error.code] ?? 'Ocurrio un error en la autenticacion.'
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Ocurrio un error inesperado en la autenticacion.'
}

const mapFirebaseUser = (currentUser: FirebaseUser): AuthUser => ({
  uid: currentUser.uid,
  email: currentUser.email,
  displayName: currentUser.displayName,
})

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Firebase detecta automáticamente si el usuario está autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(mapFirebaseUser(currentUser))
      } else {
        // Usuario no autenticado
        setUser(null)
      }
      setLoading(false)
    })

    // Limpia el listener cuando el componente se desmonta
    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setError(null)
      await signInWithEmailAndPassword(auth, email, password)
      // onAuthStateChanged se encarga de actualizar el estado
    } catch (error) {
      const message = getFirebaseErrorMessage(error)
      setError(message)
      throw new Error(message)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null)
    } catch (error) {
      setError(getFirebaseErrorMessage(error))
    }
  }

  const register = async (email: string, password: string) => {
    try {
      setError(null)
      await createUserWithEmailAndPassword(auth, email, password)
      // onAuthStateChanged se encarga de actualizar el estado
    } catch (error) {
      const message = getFirebaseErrorMessage(error)
      setError(message)
      throw new Error(message)
    }
  }

  return { user, login, logout, loading, register, error }
}
