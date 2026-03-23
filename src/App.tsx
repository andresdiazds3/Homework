import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Login } from './pages/Login'
import StackSection from './pages/StackSection'
import { PrivateRoute } from './PrivateRoutes'
import QueueSection from './pages/QueueSection'
import { Navbar } from './NavBar'



export default function App() {
  const location = useLocation()
  return (
    <>
      {location.pathname !== '/login' && (
        <PrivateRoute>
          <Navbar />
        </PrivateRoute>
      )}

      <Routes>
        <Route path="/login" element={<Login />} />
          
        <Route path="/StackSection" element={
          <PrivateRoute>
            <StackSection />
          </PrivateRoute>
        } />

        <Route path="/QueueSection" element={
          <PrivateRoute>
            <QueueSection />
          </PrivateRoute>
        } />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  )
}