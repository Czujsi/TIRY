// DriverCard.jsx
export default function DriverCard({ driver }) {
  return (
    <div className="card">
      <strong>{driver.full_name}</strong>
      <div>{driver.license_number ? `Prawo jazdy: ${driver.license_number}` : 'Brak numeru prawa jazdy'}</div>
      {driver.phone && <div>Telefon: {driver.phone}</div>}
      {driver.company_id && <div style={{fontSize:'12px', color:'#555'}}>Firma ID: {driver.company_id}</div>}
    </div>
  )
}
