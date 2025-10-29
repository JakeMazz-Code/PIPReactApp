import React, { useState, useEffect } from 'react';

function ControlsBar({
  onLocationChange,
  onFilterChange,
  onRefresh,
  filters,
  locationName
}) {
  const [zipInput, setZipInput] = useState('');
  const [isGeolocating, setIsGeolocating] = useState(false);

  // Load last used ZIP from localStorage
  useEffect(() => {
    const savedZip = localStorage.getItem('lastZip');
    if (savedZip) {
      setZipInput(savedZip);
    }
  }, []);

  const handleUseMyLocation = () => {
    setIsGeolocating(true);

    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      setIsGeolocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        onLocationChange({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          source: 'geolocation'
        });
        setIsGeolocating(false);
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('Unable to get your location. Please enter a ZIP code.');
        setIsGeolocating(false);
      }
    );
  };

  const handleZipSubmit = (e) => {
    e.preventDefault();
    const zip = zipInput.trim();

    if (zip && /^\d{5}$/.test(zip)) {
      localStorage.setItem('lastZip', zip);
      onLocationChange({ zip, source: 'zip' });
    } else {
      alert('Please enter a valid 5-digit ZIP code');
    }
  };

  return (
    <div className="controls-bar">
      <div className="location-controls">
        <button
          onClick={handleUseMyLocation}
          disabled={isGeolocating}
          className="location-button"
          aria-label="Use my current location"
        >
          {isGeolocating ? '📍 Locating...' : '📍 Use My Location'}
        </button>

        <form onSubmit={handleZipSubmit} className="zip-form">
          <input
            type="text"
            value={zipInput}
            onChange={(e) => setZipInput(e.target.value)}
            placeholder="Enter ZIP code"
            maxLength="5"
            pattern="\d{5}"
            className="zip-input"
            aria-label="ZIP code"
          />
          <button type="submit" className="zip-submit">Go</button>
        </form>

        {locationName && (
          <span className="location-name" aria-live="polite">
            📌 {locationName}
          </span>
        )}
      </div>

      <div className="filter-controls">
        <div className="filter-group">
          <label htmlFor="timeWindow">Time Window:</label>
          <select
            id="timeWindow"
            value={filters.windowHours}
            onChange={(e) => onFilterChange({ windowHours: Number(e.target.value) })}
            className="filter-select"
          >
            <option value="24">Last 24 hours</option>
            <option value="48">Last 48 hours</option>
            <option value="168">Last 7 days</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="radius">Radius: {filters.radiusMi} mi</label>
          <input
            id="radius"
            type="range"
            min="10"
            max="250"
            step="10"
            value={filters.radiusMi}
            onChange={(e) => onFilterChange({ radiusMi: Number(e.target.value) })}
            className="filter-slider"
            aria-label={`Radius: ${filters.radiusMi} miles`}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="minMag">Min Magnitude: {filters.minMag.toFixed(1)}</label>
          <input
            id="minMag"
            type="range"
            min="0"
            max="4"
            step="0.5"
            value={filters.minMag}
            onChange={(e) => onFilterChange({ minMag: Number(e.target.value) })}
            className="filter-slider"
            aria-label={`Minimum magnitude: ${filters.minMag.toFixed(1)}`}
          />
        </div>

        <button onClick={onRefresh} className="refresh-button" aria-label="Refresh earthquake data">
          🔄 Refresh
        </button>
      </div>
    </div>
  );
}

export default ControlsBar;
