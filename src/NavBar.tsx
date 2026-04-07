import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from './context/authContext'

export function Navbar() {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  const username = auth?.user?.displayName || auth?.user?.email?.split('@')[0] || 'Usuario'

  const handleLogout = async () => {
    await auth?.logout()
    navigate('/login', { replace: true })
  }

  return (
    <nav className="nav-main navbar navbar-expand-lg px-3 px-md-4 py-3">
      <div className="container-fluid px-0">
        <div className="d-flex align-items-center gap-2">
          <span className="nav-main__badge">T</span>
          <span className="fw-semibold nav-main__title">Task Control</span>
        </div>

        <div className="d-flex align-items-center gap-2 ms-auto">
          <NavLink className={({ isActive }) => `btn btn-sm nav-main__link ${isActive ? 'nav-main__link--active' : ''}`} to="/tasks">
            Mis tareas
          </NavLink>

          <span className="small nav-main__user d-none d-md-inline">Hola, {username}</span>
          <button className="btn btn-sm nav-main__logout" onClick={handleLogout}>Cerrar sesion</button>
        </div>
      </div>
    </nav>
  )
}