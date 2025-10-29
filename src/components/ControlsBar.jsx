import React, { useState, useEffect, useRef } from 'react';
import { filterCities } from '../utils/cities';

function ControlsBar({
  onLocationChange,
  onFilterChange,
  onRefresh,
  filters,
  locationName
}) {
  const [zipInput, setZipInput] = useState('');
  const [isGeolocating, setIsGeolocating] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Load last used ZIP from localStorage
  useEffect(() => {
    const savedZip = localStorage.getItem('lastZip');
    if (savedZip) {
      setZipInput(savedZip);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle input change and filter cities
  const handleInputChange = (e) => {
    const value = e.target.value;
    setZipInput(value);

    // Only show suggestions for text input (not pure numbers)
    if (value.length >= 2 && !/^\d+$/.test(value)) {
      const filtered = filterCities(value);
      setSuggestions(filtered);
      setShowDropdown(filtered.length > 0);
      setSelectedIndex(-1);
    } else {
      setShowDropdown(false);
      setSuggestions([]);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (city) => {
    setZipInput(city.label);
    setShowDropdown(false);
    setSuggestions([]);
    // Immediately submit
    localStorage.setItem('lastZip', city.label);
    onLocationChange({ zip: city.label, source: 'zip' });
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showDropdown || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        if (selectedIndex >= 0) {
          e.preventDefault();
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowDropdown(false);
        setSuggestions([]);
        setSelectedIndex(-1);
        break;
      default:
        break;
    }
  };

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
    const input = zipInput.trim();

    // Accept ZIP code (12345) or City, ST (Los Angeles, CA)
    if (input && (/^\d{5}$/.test(input) || /^[a-zA-Z\s]+,\s*[A-Z]{2}$/.test(input))) {
      localStorage.setItem('lastZip', input);
      onLocationChange({ zip: input, source: 'zip' });
    } else {
      alert('Enter ZIP (e.g., 90210) or City, ST (e.g., Los Angeles, CA)');
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
          {isGeolocating ? 'Locating...' : 'Use My Location'}
        </button>

        <form onSubmit={handleZipSubmit} className="zip-form" ref={dropdownRef}>
          <div className="autocomplete-wrapper">
            <input
              ref={inputRef}
              type="text"
              value={zipInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="ZIP or City, ST"
              className="zip-input"
              aria-label="ZIP code or city"
              autoComplete="off"
            />
            {showDropdown && suggestions.length > 0 && (
              <div className="autocomplete-dropdown">
                {suggestions.map((city, index) => (
                  <div
                    key={city.label}
                    className={`autocomplete-item ${index === selectedIndex ? 'selected' : ''}`}
                    onClick={() => handleSuggestionClick(city)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <span className="city-name">{city.name}</span>
                    <span className="state-code">{city.state}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button type="submit" className="zip-submit">Go</button>
        </form>

        {locationName && (
          <span className="location-name" aria-live="polite">
            {locationName}
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
          Refresh
        </button>
      </div>
    </div>
  );
}

export default ControlsBar;
