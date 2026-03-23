import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = () => {
    if (email === 'user@mail.com' && password === '123') {
      auth?.login({ name: 'User', email })
      navigate('/dashboard', { replace: true })
    } else {
      setError('Credenciales incorrectas')
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleLogin}>Ingresar</button>
    </div>
  )
}