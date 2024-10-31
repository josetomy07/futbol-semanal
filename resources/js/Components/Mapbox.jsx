import React, { useEffect, useRef } from 'react'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';



    const Mapbox = ({ latitude, longitude }) => {

        const mapContainer = useRef(null);

        useEffect(() => {
            // Inicializar el mapa
            const map = L.map(mapContainer.current).setView([latitude, longitude], 13);

            // Cargar el mapa de OpenStreetMap
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
            }).addTo(map);

            // Agregar un marcador
            L.marker([latitude, longitude]).addTo(map);

            return () => {
                map.remove(); // Limpiar el mapa al desmontar
            };
        }, [latitude, longitude]);


        return (

            <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />
        )
    }

export default Mapbox
