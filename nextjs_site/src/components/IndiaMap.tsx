'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Leaflet requires defining custom marker icons manually in Next.js builds
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

const cpsLabs = [
  {"name": "CCCT Chisopani, Sikkim", "lat": 27.1669, "lng": 88.4936},
  {"name": "NIT Delhi", "lat": 28.7496, "lng": 77.1166},
  {"name": "Dr. B.R. Ambedkar Institute, Jalandhar", "lat": 31.3959, "lng": 75.5352},
  {"name": "Tula's Institute, Dehradun", "lat": 30.3165, "lng": 78.0300},
  {"name": "Thapar Institute, Patiala", "lat": 30.3565, "lng": 76.3647},
  {"name": "Chitkara University, Punjab", "lat": 30.5170, "lng": 76.6590},
  {"name": "Baba Farid College, Bathinda", "lat": 30.2110, "lng": 74.9525},
  {"name": "University of Ladakh, Leh", "lat": 34.1580, "lng": 77.5830},
  {"name": "KCET Amritsar", "lat": 31.6340, "lng": 74.8723},
  {"name": "IIIT Una", "lat": 31.4710, "lng": 76.1716},
  {"name": "CICU Ludhiana", "lat": 30.9000, "lng": 75.8573},
  {"name": "IILM University, Greater Noida", "lat": 28.4744, "lng": 77.5030},
  {"name": "HRIT University, Ghaziabad", "lat": 28.7814, "lng": 77.5264},
  {"name": "SVPUAT Meerut", "lat": 28.9845, "lng": 77.7064},
  {"name": "Acropolis Institute, Indore", "lat": 22.7196, "lng": 75.8577},
  {"name": "Hindustan Institute, Chennai", "lat": 12.8432, "lng": 80.1546},
  {"name": "MIET Jammu", "lat": 32.7266, "lng": 74.8570},
  // Added 5 locations to hit 22 total deployments as mapped in original flutter
  {"name": "Shoolini University, Solan", "lat": 30.9084, "lng": 77.0863},
  {"name": "Ambala College of Engineering", "lat": 30.3782, "lng": 76.7767},
  {"name": "Chandigarh University", "lat": 30.7681, "lng": 76.5754},
  {"name": "Govt Polytechnic College Bhikhiwind", "lat": 31.3303, "lng": 74.7088},
  {"name": "SBAS Govt Polytechnic Barnala", "lat": 30.3800, "lng": 75.5463},
];

export default function IndiaMap() {
  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden z-10 border border-white/5 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
      <MapContainer 
        center={[22.5937, 78.9629]} 
        zoom={4.3} 
        scrollWheelZoom={false}
        className="w-full h-full"
        style={{ zIndex: 1, backgroundColor: '#0A0E17' }} // Matches nextjs space
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {cpsLabs.map((lab, index) => (
          <Marker 
            key={index} 
            position={[lab.lat, lab.lng]} 
            icon={icon}
          >
            <Popup className="font-body">
              <div className="text-gray-900 font-bold mb-1">{lab.name}</div>
              <div className="text-gray-600 text-[10px] text-center border-t pt-1 mt-1 border-gray-200 uppercase tracking-widest">
                CPS Laboratory Network
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Heavy inner shadow to blend the cartographic map softly into the dark Next.js boundary */}
      <div className="absolute inset-0 pointer-events-none z-20 shadow-[inset_0_0_80px_rgba(17,24,39,1)]"></div>
    </div>
  );
}
