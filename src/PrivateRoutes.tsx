import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from './context/authContext'

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const auth = useContext(AuthContext)
  return auth?.user ? <>{children}</> : <Navigate to="/login" replace />
}