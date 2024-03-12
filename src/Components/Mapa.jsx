import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon from '../assets/ubi.png';

const Mapa = ({ paisesConUsuarios }) => {

    const customMarkerIcon = L.icon({
        iconUrl: markerIcon,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
    });

    return (
        <div>
            <MapContainer center={[0, 0]} zoom={2} style={{ minWidth: '400px', minHeight: '400px' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {paisesConUsuarios.map((pais, index) => (
                    <Marker key={index} position={[pais.latitude, pais.longitude]} icon={customMarkerIcon}>
                        <Popup>
                            <h3>{pais.name}</h3>
                            <p>Cantidad de Usuarios: {pais.cantidadDeUsuarios}</p>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default Mapa;
