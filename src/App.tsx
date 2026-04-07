import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Tasks } from './pages/Tasks'
import { PrivateRoute } from './PrivateRoutes'
import { Navbar } from './NavBar'

export default function App() {
  const location = useLocation()
  const hideNavbarRoutes = ['/login', '/register']

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && (
        <PrivateRoute>
          <Navbar />
        </PrivateRoute>
      )}

      <Routes>
        <Route path="/" element={<Navigate to="/tasks" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
          
        <Route path="/tasks" element={
          <PrivateRoute>
            <Tasks />
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/tasks" replace />} />
      </Routes>
    </>
  )
}