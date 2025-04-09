import React from 'react';
import { GoogleMap, LoadScript, Marker, Polygon } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh',
  display: 'flex',
};

const mapContainerStyle = {
  flex: 1,
};

const menuStyle = {
  width: '250px',
  background: '#f4f4f4',
  padding: '20px',
  boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
};

const center = {
  lat: 44.9778,
  lng: -93.2650,
};

const truckIcon = {
  url: 'https://maps.google.com/mapfiles/kml/shapes/truck.png',
  scaledSize: { width: 40, height: 40 },
};

const routes = [
  {
    color: '#FF0000',
    path: [
      { lat: 44.980, lng: -93.270 },
      { lat: 44.982, lng: -93.265 },
      { lat: 44.981, lng: -93.260 },
      { lat: 44.979, lng: -93.261 },
      { lat: 44.980, lng: -93.270 },
    ],
  },
  {
    color: '#00FF00',
    path: [
      { lat: 44.975, lng: -93.270 },
      { lat: 44.976, lng: -93.265 },
      { lat: 44.975, lng: -93.260 },
      { lat: 44.974, lng: -93.261 },
      { lat: 44.975, lng: -93.270 },
    ],
  },
  {
    color: '#0000FF',
    path: [
      { lat: 44.979, lng: -93.280 },
      { lat: 44.980, lng: -93.275 },
      { lat: 44.978, lng: -93.273 },
      { lat: 44.977, lng: -93.277 },
      { lat: 44.979, lng: -93.280 },
    ],
  },
];

const trucks = [
  { id: 'Truck 4102', position: { lat: 44.981, lng: -93.263 } },
  { id: 'Truck 4506', position: { lat: 44.976, lng: -93.264 } },
  { id: 'Truck 4508', position: { lat: 44.978, lng: -93.276 } },
];

const DispatcherMap = () => {
  return (
    <div style={containerStyle}>
      {/* Menu on the left */}
      <div style={menuStyle}>
        <h2>Dispatcher Menu</h2>
        <ul>
          <li>Truck Assignments</li>
          <li>Route Management</li>
          <li>Notifications</li>
        </ul>
      </div>

      {/* Map container */}
      <div style={mapContainerStyle}>
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={center}
            zoom={14}
          >
            {/* Draw polygons */}
            {routes.map((route, index) => (
              <Polygon
                key={index}
                paths={route.path}
                options={{
                  fillColor: route.color,
                  fillOpacity: 0.2,
                  strokeColor: route.color,
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  clickable: false,
                  editable: false,
                  draggable: false,
                }}
              />
            ))}

            {/* Truck markers */}
            {trucks.map((truck) => (
              <Marker
                key={truck.id}
                position={truck.position}
                icon={truckIcon}
                label={truck.id}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default DispatcherMap;
