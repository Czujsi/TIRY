// Maintenance.jsx
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth.js'
import axios from 'axios'

export default function Maintenance() {
  const { token } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ scheduled_date:'', description:'', truck_id:'' })

  useEffect(() => {
    if (!token) return
    setLoading(true)
    axios.get('/api/v1/maintenance/', { headers: { Authorization:`Bearer ${token}` } })
      .then(res => setItems(res.data))
      .finally(() => setLoading(false))
  }, [token])

  const handleCreate = async e => {
    e.preventDefault()
    try {
      const payload = { scheduled_date: new Date(form.scheduled_date).toISOString(), description: form.description, truck_id: Number(form.truck_id) }
      const res = await axios.post('/api/v1/maintenance/', payload, { headers: { Authorization:`Bearer ${token}` } })
      setItems(prev => [res.data, ...prev])
      setForm({ scheduled_date:'', description:'', truck_id:'' })
    } catch { alert('Błąd tworzenia') }
  }

  const markComplete = async id => {
    await axios.patch(`/api/v1/maintenance/${id}/complete`, {}, { headers: { Authorization:`Bearer ${token}` } })
    setItems(prev => prev.map(i => i.id===id ? {...i, completed:true} : i))
  }

  return (
    <div className="container">
      <h1>Kalendarz serwisów</h1>
      <form onSubmit={handleCreate}>
        <input type="datetime-local" value={form.scheduled_date} onChange={e => setForm(f=>({...f, scheduled_date:e.target.value}))} required/>
        <input placeholder="Opis" value={form.description} onChange={e => setForm(f=>({...f, description:e.target.value}))} required/>
        <input placeholder="Truck ID" value={form.truck_id} onChange={e => setForm(f=>({...f, truck_id:e.target.value}))}/>
        <button type="submit">Dodaj serwis</button>
      </form>

      {loading ? <p>Ładowanie...</p> :
        <div className="grid">
          {items.map(i => (
            <div key={i.id} className={`card ${i.completed ? 'completed':'not-completed'}`}>
              <div><strong>{new Date(i.scheduled_date).toLocaleString()}</strong> — {i.description}</div>
              <div>Truck ID: {i.truck_id} — {i.completed ? 'Tak' : 'Nie'}</div>
              {!i.completed && <button onClick={()=>markComplete(i.id)}>Oznacz jako wykonane</button>}
            </div>
          ))}
        </div>
      }
    </div>
  )
}
