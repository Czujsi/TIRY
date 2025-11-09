export default function TruckCard({ truck }) {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '8px',
      }}
    >
      <h4>{truck.brand}</h4>
      <p>Rejestracja: {truck.registration_number}</p>
      <p>VIN: {truck.vin}</p>
    </div>
  )
}
