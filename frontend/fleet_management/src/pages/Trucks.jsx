// Trucks.jsx
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth.js'
import axios from 'axios'
import TruckCard from '../components/TruckCard.jsx'

export default function Trucks() {
  const { token } = useAuth()
  const [trucks, setTrucks] = useState([])

  // Stan formularza
  const [form, setForm] = useState({
    vin: '',
    registration_number: '',
    brand: '',
    model: '',
    mileage: 0,
    company_id: ''
  })

  const [creating, setCreating] = useState(false)

  // Pobieranie ciężarówek
  useEffect(() => {
    if (!token) return
    axios.get('/api/v1/trucks/', { headers:{ Authorization:`Bearer ${token}` } })
      .then(res => setTrucks(res.data))
      .catch(err => console.error(err))
  }, [token])

  // Obsługa zmian w formularzu
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  // Dodawanie ciężarówki
  const handleCreate = async (e) => {
    e.preventDefault()
    setCreating(true)
    try {
      const payload = {
        vin: form.vin,
        registration_number: form.registration_number,
        brand: form.brand,
        model: form.model,
        mileage: parseFloat(form.mileage) || 0,
        company_id: form.company_id || null
      }
      const res = await axios.post('/api/v1/trucks/', payload, {
        headers: { Authorization: `Bearer ${token}` }
      })
      // Dodaj nową ciężarówkę do listy
      setTrucks(prev => [res.data, ...prev])
      // Zresetuj formularz
      setForm({
        vin: '',
        registration_number: '',
        brand: '',
        model: '',
        mileage: 0,
        company_id: ''
      })
    } catch (err) {
      console.error(err)
      alert('Błąd podczas dodawania ciężarówki')
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="container">
      <section>
        <h3>Dodaj nową ciężarówkę</h3>
        <form onSubmit={handleCreate}>
          <input
            name="vin"
            placeholder="VIN"
            value={form.vin}
            onChange={handleChange}
            required
          />
          <input
            name="registration_number"
            placeholder="Numer rejestracyjny"
            value={form.registration_number}
            onChange={handleChange}
            required
          />
          <input
            name="brand"
            placeholder="Marka"
            value={form.brand}
            onChange={handleChange}
          />
          <input
            name="model"
            placeholder="Model"
            value={form.model}
            onChange={handleChange}
          />
          <input
            name="mileage"
            type="number"
            placeholder="Przebieg"
            value={form.mileage}
            onChange={handleChange}
          />
          <input
            name="company_id"
            placeholder="ID firmy (opcjonalne)"
            value={form.company_id}
            onChange={handleChange}
          />
          <button type="submit" disabled={creating}>
            {creating ? 'Dodawanie...' : 'Dodaj ciężarówkę'}
          </button>
        </form>
      </section>

      <section>
        <h2>Lista ciężarówek</h2>
        <div className="grid">
          {trucks.map(t => <TruckCard key={t.id} truck={t}/>)}
        </div>
      </section>
    </div>
  )
}
