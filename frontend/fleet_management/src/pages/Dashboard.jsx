// Dashboard.jsx
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth.js'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Dashboard() {
  const { token, logout } = useAuth()
  const [trucksCount, setTrucksCount] = useState(0)
  const [driversCount, setDriversCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!token) return
    setLoading(true)
    const headers = { Authorization: `Bearer ${token}` }

    axios.get('/stats/', { headers })
      .then(res => setStats(res.data))
      .catch(() => setError('Błąd pobierania statystyk'))

    Promise.all([axios.get('/api/v1/trucks/', { headers }), axios.get('/api/v1/drivers/', { headers })])
      .then(([tRes, dRes]) => {
        setTrucksCount(Array.isArray(tRes.data) ? tRes.data.length : 0)
        setDriversCount(Array.isArray(dRes.data) ? dRes.data.length : 0)
      })
      .catch(() => setError('Błąd podczas pobierania danych.'))
      .finally(() => setLoading(false))
  }, [token])

  if (!token) return <div className="container">Zaloguj się</div>

  return (
    <div className="container">
      <header className="header">
        <h1>Dashboard floty</h1>
        <div className="nav-links">
          <Link to="/trucks">Ciężarówki</Link>
          <Link to="/drivers">Kierowcy</Link>
          <Link to="/maintenance">Serwisy</Link>
          <button onClick={() => { logout(); window.location.href = '/login' }}>Wyloguj</button>
        </div>
      </header>

      {loading && <p>Ładowanie danych...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <>
          <div className="grid">
            <div className="card">
              <h3>Łączna liczba pojazdów</h3>
              <p style={{ fontSize: '28px' }}>{trucksCount}</p>
              <small>Aktywne wpisy w systemie</small>
            </div>
            <div className="card">
              <h3>Łączna liczba kierowców</h3>
              <p style={{ fontSize: '28px' }}>{driversCount}</p>
              <small>Przypisani do firm / floty</small>
            </div>
            <div className="card">
              <h3>Akcje</h3>
              <p>
                <Link to="/trucks">Zarządzaj ciężarówkami</Link><br/>
                <Link to="/drivers">Zarządzaj kierowcami</Link>
              </p>
              <small>Dodawaj, edytuj lub przeglądaj szczegóły</small>
            </div>
          </div>

          {stats && (
            <div className="grid" style={{ marginTop: '24px' }}>
              <div className="card">
                <h3>Pojazdy</h3>
                <p style={{ fontSize: '24px' }}>{stats.trucks_count}</p>
                <Link to="/trucks">Zarządzaj</Link>
              </div>
              <div className="card">
                <h3>Kierowcy</h3>
                <p style={{ fontSize: '24px' }}>{stats.drivers_count}</p>
                <Link to="/drivers">Zarządzaj</Link>
              </div>
              <div className="card">
                <h3>Nadchodzące przeglądy (7d)</h3>
                <p style={{ fontSize: '24px' }}>{stats.upcoming_maintenances_7d}</p>
                <Link to="/maintenance">Kalendarz serwisów</Link>
              </div>
              <div className="card">
                <h3>Zaległe serwisy</h3>
                <p style={{ fontSize: '24px' }}>{stats.overdue_maintenances}</p>
              </div>
            </div>
          )}
        </>
      )}

      <footer>
        <small>Demo — Fleet Management</small>
      </footer>
    </div>
  )
}
