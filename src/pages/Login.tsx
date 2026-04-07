import { useContext, useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }

  return 'Unexpected login error.'
}

export function Login() {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (auth?.user) {
    return <Navigate to="/tasks" replace />
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!email || !password) {
      setError('Completa todos los campos.')
      return
    }

    try {
      setError(null)
      setIsSubmitting(true)
      await auth?.login(email, password)
      navigate('/tasks', { replace: true })
    } catch (loginError) {
      setError(getErrorMessage(loginError))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="auth-page container py-5">
      <div className="auth-card mx-auto p-4 p-md-5">
        <span className="auth-card__eyebrow">Task Challenge</span>
        <h1 className="auth-card__title mb-2">Login</h1>
        <p className="auth-card__subtitle mb-4">Inicia sesión con Firebase para acceder a tus tareas.</p>

        <form className="d-grid gap-3" onSubmit={handleSubmit}>
          <input
            className="form-control auth-field"
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={isSubmitting}
          />
          <input
            className="form-control auth-field"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={isSubmitting}
          />

          {error && <p className="auth-error mb-0">{error}</p>}
          {auth?.error && !error && <p className="auth-error mb-0">{auth.error}</p>}

          <button className="btn auth-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Ingresando...' : 'Entrar'}
          </button>

          <p className="mb-0 text-center auth-card__hint">
            ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
          </p>
        </form>
      </div>
    </section>
  )
}