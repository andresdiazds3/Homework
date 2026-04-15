import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from './context/authContext'

export function PrivateRoute() {
  const auth = useContext(AuthContext)

  if (auth?.loading) return null

  return auth?.user ? <Outlet /> : <Navigate to="/login" replace />
}

export function PublicRoute() {
  const auth = useContext(AuthContext)

  if (auth?.loading) return null

  return auth?.user ? <Navigate to="/tree" replace /> : <Outlet />
}