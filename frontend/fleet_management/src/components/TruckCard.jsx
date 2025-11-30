// TruckCard.jsx
export default function TruckCard({ truck }) {
  return (
    <div className="card">
      <h4>{truck.brand}</h4>
      <p>Rejestracja: {truck.registration_number}</p>
      <p>VIN: {truck.vin}</p>
    </div>
  )
}
