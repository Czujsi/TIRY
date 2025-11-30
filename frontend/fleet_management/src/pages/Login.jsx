// Login.jsx
import { useState } from 'react'
import axios from 'axios'
import useAuth from '../hooks/useAuth.js'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const data = new URLSearchParams()
      data.append('username', email)
      data.append('password', password)
      const res = await axios.post('/api/v1/auth/token', data, { headers:{ 'Content-Type':'application/x-www-form-urlencoded' }})
      login(res.data.access_token)
      window.location.href = '/'
    } catch { setError('Nieprawidłowe dane logowania') }
  }

  return (
    <div className="container">
      <h2>Logowanie</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Hasło" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">Zaloguj</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  )
}
