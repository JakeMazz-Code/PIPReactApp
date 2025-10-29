import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import ControlsBar from './components/ControlsBar';
import MapView from './components/MapView';
import QuakeList from './components/QuakeList';
import LoadingError from './components/LoadingError';
import { getCoordinatesFromZip } from './utils/geo';
import { fetchEarthquakes } from './utils/usgs';

function App() {
  // Location state
  const [userLocation, setUserLocation] = useState(null);
  const [locationName, setLocationName] = useState('');

  // Filter state
  const [filters, setFilters] = useState({
    windowHours: 24,
    radiusMi: 50,
    minMag: 0.0
  });

  // Data state
  const [quakes, setQuakes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // UI state
  const [selectedQuake, setSelectedQuake] = useState(null);

  // Fetch earthquakes
  const fetchQuakes = useCallback(async () => {
    if (!userLocation) return;

    setLoading(true);
    setError(null);

    try {
      const earthquakes = await fetchEarthquakes({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        windowHours: filters.windowHours,
        radiusMi: filters.radiusMi,
        minMag: filters.minMag
      });

      setQuakes(earthquakes);
    } catch (err) {
      setError(err.message);
      setQuakes([]);
    } finally {
      setLoading(false);
    }
  }, [userLocation, filters]);

  // Fetch quakes when location or filters change
  useEffect(() => {
    fetchQuakes();
  }, [fetchQuakes]);

  // Handle location change
  const handleLocationChange = async (locationData) => {
    setLoading(true);
    setError(null);

    try {
      if (locationData.source === 'geolocation') {
        setUserLocation({
          latitude: locationData.latitude,
          longitude: locationData.longitude
        });
        setLocationName('Current Location');
      } else if (locationData.source === 'zip') {
        const coords = await getCoordinatesFromZip(locationData.zip);
        setUserLocation({
          latitude: coords.latitude,
          longitude: coords.longitude
        });
        setLocationName(coords.placeName);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Handle filter change
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Handle refresh
  const handleRefresh = () => {
    fetchQuakes();
  };

  // Handle quake selection
  const handleSelectQuake = (quake) => {
    setSelectedQuake(quake);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Seismic Activity Monitor</h1>
        <p className="subtitle">Real-time earthquake detection and analysis</p>
      </header>

      <ControlsBar
        onLocationChange={handleLocationChange}
        onFilterChange={handleFilterChange}
        onRefresh={handleRefresh}
        filters={filters}
        locationName={locationName}
      />

      {!userLocation && !loading && !error && (
        <div className="welcome-message">
          <h2>Seismic Event Monitor</h2>
          <p>Set location to begin tracking</p>
        </div>
      )}

      <LoadingError loading={loading} error={error} onRetry={handleRefresh} />

      {userLocation && !loading && !error && (
        <div className="main-content">
          <div className="map-section">
            <MapView
              quakes={quakes}
              userLocation={userLocation}
              selectedQuake={selectedQuake}
              onSelectQuake={handleSelectQuake}
            />
          </div>

          <div className="list-section">
            <QuakeList
              quakes={quakes}
              userLocation={userLocation}
              selectedQuakeId={selectedQuake?.id}
              onSelectQuake={handleSelectQuake}
            />
          </div>
        </div>
      )}

      <footer className="app-footer">
        <p>
          Data provided by{' '}
          <a
            href="https://earthquake.usgs.gov/"
            target="_blank"
            rel="noopener noreferrer"
          >
            USGS Earthquake Hazards Program
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
