export default function DriverCard({ driver }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: 8,
      padding: 12,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <strong style={{ fontSize: 16 }}>{driver.full_name}</strong>
        <div style={{ color: '#555' }}>
          {driver.license_number ? `Prawo jazdy: ${driver.license_number}` : 'Brak numeru prawa jazdy'}
        </div>
        {driver.phone && <div style={{ color: '#555' }}>Telefon: {driver.phone}</div>}
        {driver.company_id && <div style={{ color: '#777', fontSize: 12 }}>Firma ID: {driver.company_id}</div>}
      </div>

      <div>
        {/* Placeholder buttons — można dodać edycję/usuwanie */}
        <button style={{ marginRight: 8 }} onClick={() => alert('Szczegóły (demo)')}>Szczegóły</button>
        <button onClick={() => alert('Edytuj (demo)')}>Edytuj</button>
      </div>
    </div>
  )
}
