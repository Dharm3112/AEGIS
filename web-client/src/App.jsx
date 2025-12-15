import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet missing marker icons
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

function App() {
  const [tickets, setTickets] = useState([]);

  // Fetch data every 5 seconds (Simulating Real-time)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/sos');
        setTickets(res.data);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundColor: '#1a1a1a', color: '#d8b4fe', height: '100vh', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>🟣 LifeLine Command Center</h1>

      <div style={{ height: '500px', borderRadius: '15px', overflow: 'hidden', border: '2px solid #6b21a8' }}>
        <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          {tickets.map((ticket) => (
            <Marker key={ticket.id} position={[ticket.latitude, ticket.longitude]}>
              <Popup>
                <strong>Priority: {ticket.priority_score}</strong><br />
                {ticket.description}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Active Alerts: {tickets.length}</h2>
        {tickets.map(t => (
          <div key={t.id} style={{ borderBottom: '1px solid #444', padding: '10px' }}>
            <span style={{ color: t.priority_score === 5 ? 'red' : 'orange' }}>
              [Priority {t.priority_score}]
            </span>
            {t.description}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;