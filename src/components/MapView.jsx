import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { getMagnitudeColor } from '../utils/usgs';

// Fix for default marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function MapView({ quakes, userLocation, selectedQuake, onSelectQuake }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView([37.7749, -122.4194], 6);

    // CARTO Dark Matter basemap for Anduril-inspired dark aesthetic
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map center when user location changes
  useEffect(() => {
    if (mapInstanceRef.current && userLocation) {
      mapInstanceRef.current.setView(
        [userLocation.latitude, userLocation.longitude],
        9,
        { animate: true }
      );
    }
  }, [userLocation]);

  // Update markers when quakes change
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    if (!quakes || !quakes.length) return;

    // Add user location marker
    if (userLocation) {
      const userMarker = L.marker([userLocation.latitude, userLocation.longitude], {
        title: 'Your Location'
      }).addTo(mapInstanceRef.current);

      userMarker.bindPopup('<strong>Your Location</strong>');
      markersRef.current.push(userMarker);
    }

    // Add earthquake markers
    quakes.forEach((quake) => {
      const [lon, lat, depth] = quake.geometry.coordinates;
      const mag = quake.properties.mag || 0;
      const color = getMagnitudeColor(mag);

      // Create minimal custom icon with thin ring
      const size = Math.max(12, mag * 4);
      const icon = L.divIcon({
        className: 'custom-quake-marker',
        html: `<div style="
          background-color: ${color};
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.4);
          transition: all 180ms cubic-bezier(0.2, 0.9, 0.2, 1);
        "></div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2]
      });

      const marker = L.marker([lat, lon], { icon }).addTo(mapInstanceRef.current);

      const popupContent = `
        <div class="map-popup">
          <strong>M ${mag.toFixed(1)}</strong><br/>
          ${quake.properties.place}<br/>
          <small>Depth: ${depth.toFixed(1)} km</small><br/>
          <small>${new Date(quake.properties.time).toLocaleString()}</small>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('click', () => {
        onSelectQuake(quake);
      });

      markersRef.current.push(marker);
    });

    // Fit bounds to show all markers (with safety check)
    if (markersRef.current.length > 1) {
      try {
        const group = L.featureGroup(markersRef.current);
        const bounds = group.getBounds();
        if (bounds.isValid()) {
          // Small delay to allow initial centering to complete
          setTimeout(() => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.fitBounds(bounds.pad(0.1), { animate: true, duration: 0.5 });
            }
          }, 100);
        }
      } catch (error) {
        console.warn('Map bounds fitting skipped:', error.message);
      }
    }
  }, [quakes, userLocation, onSelectQuake]);

  // Highlight selected quake
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedQuake) return;

    const [lon, lat] = selectedQuake.geometry.coordinates;
    mapInstanceRef.current.setView([lat, lon], 10, { animate: true });

    // Find and open the popup for the selected marker
    markersRef.current.forEach((marker) => {
      const markerLatLng = marker.getLatLng();
      if (markerLatLng.lat === lat && markerLatLng.lng === lon) {
        marker.openPopup();
      }
    });
  }, [selectedQuake]);

  return (
    <div className="map-container">
      <div ref={mapRef} className="map" role="application" aria-label="Earthquake map"></div>
      <div className="map-legend">
        <div className="legend-title">Magnitude</div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#28C76F' }}></span>
          <span>≤ 2.5 Minor</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#FFB020' }}></span>
          <span>2.6 - 4.0 Light</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#FF7A00' }}></span>
          <span>&gt; 4.0 Moderate+</span>
        </div>
      </div>
    </div>
  );
}

export default MapView;
