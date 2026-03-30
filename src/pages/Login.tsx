import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import '../styles/Login.css'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [loading, setLoading] = useState(false)
  const authContext = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Completa todos los campos')
      return
    }
    
    try {
      setLoading(true)
      setError('')
      await authContext?.login(email, password)
      navigate('/StackSection', { replace: true })
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async () => {
    if (!email || !password) {
      setError('Completa todos los campos')
      return
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }
    
    try {
      setLoading(true)
      setError('')
      await authContext?.register(email, password)
      // Después de registrase, se logea automáticamente
      navigate('/StackSection', { replace: true })
    } catch (err: any) {
      setError(err.message || 'Error al registrarse')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="login-page">
      <div className="login-card">
        <h2 className="login-card__title">
          {isRegistering ? 'Registrarse' : 'Login'}
        </h2>
        <p className="login-card__subtitle">
          {isRegistering 
            ? 'Crea una cuenta para acceder' 
            : 'Accede para usar la biblioteca o el ATM'}
        </p>

        <div className="login-form">
          <input
            className="login-form__input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <input
            className="login-form__input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          {error && <p className="login-form__error">{error}</p>}

          <button 
            className="login-form__button" 
            onClick={isRegistering ? handleRegister : handleLogin}
            disabled={loading}
          >
            {loading ? 'Cargando...' : isRegistering ? 'Registrarse' : 'Ingresar'}
          </button>

          <button 
            className="login-form__toggle"
            onClick={() => {
              setIsRegistering(!isRegistering)
              setError('')
              setEmail('')
              setPassword('')
            }}
            disabled={loading}
          >
            {isRegistering 
              ? '¿Ya tienes cuenta? Inicia sesión' 
              : '¿No tienes cuenta? Regístrate'}
          </button>
        </div>
      </div>
    </section>
  )
}