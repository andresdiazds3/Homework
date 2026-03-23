import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from './context/authContext'
import './styles/NavBar.css'

export function Navbar() {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    auth?.logout()
    navigate('/login', { replace: true })
  }

  return (
    <nav className="navbar">
      <div className="navbar__links">
        <NavLink className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`} to="/StackSection">Biblioteca</NavLink>
        <NavLink className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`} to="/QueueSection">Cajero</NavLink>
      </div>

      <div className="navbar__right">
        <span className="navbar__user">Hola, {(auth?.user as any)?.name}</span>
        <button className="navbar__button" onClick={handleLogout}>Cerrar sesion</button>
      </div>
    </nav>
  )
}