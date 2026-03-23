import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import '../styles/Login.css'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = () => {
    if (email === 'user@mail.com' && password === '123') {
      auth?.login({ name: 'User', email })
      navigate('/StackSection', { replace: true })
    } else {
      setError('Credenciales incorrectas')
    }
  }

  return (
    <section className="login-page">
      <div className="login-card">
        <h2 className="login-card__title">Login</h2>
        <p className="login-card__subtitle">Accede para usar la biblioteca o el ATM</p>

        <div className="login-form">
          <input
            className="login-form__input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="login-form__input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="login-form__error">{error}</p>}

          <button className="login-form__button" onClick={handleLogin}>Ingresar</button>
          <p className="login-form__hint">Demo: user@mail.com / 123</p>
        </div>
      </div>
    </section>
  )
}