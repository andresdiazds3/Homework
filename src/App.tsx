import { Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { PrivateRoute, PublicRoute } from './PrivateRoutes'
import { TreeManager } from './pages/TreeManager'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/tree" replace />} />

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/tree" element={<TreeManager />} />
      </Route>

      <Route path="*" element={<Navigate to="/tree" replace />} />
    </Routes>
  )
}