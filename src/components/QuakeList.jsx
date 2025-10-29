import React, { useState, useMemo } from 'react';
import QuakeCard from './QuakeCard';
import { haversineDistance, calculateMatchScore } from '../utils/geo';

function QuakeList({ quakes, userLocation, selectedQuakeId, onSelectQuake }) {
  const [sortMode, setSortMode] = useState('time'); // 'time' or 'distance'

  // Calculate distances and scores for all quakes
  const enrichedQuakes = useMemo(() => {
    if (!userLocation || !quakes.length) return [];

    const nowMs = Date.now();

    return quakes.map((quake) => {
      const distance = haversineDistance(
        userLocation.latitude,
        userLocation.longitude,
        quake.geometry.coordinates[1],
        quake.geometry.coordinates[0]
      );

      const matchData = calculateMatchScore(
        quake,
        userLocation.latitude,
        userLocation.longitude,
        nowMs
      );

      return {
        ...quake,
        distance,
        matchScore: matchData.score,
        isLikelyMatch: matchData.isLikelyMatch
      };
    });
  }, [quakes, userLocation]);

  // Sort quakes based on current sort mode
  const sortedQuakes = useMemo(() => {
    const sorted = [...enrichedQuakes];

    if (sortMode === 'time') {
      sorted.sort((a, b) => b.properties.time - a.properties.time);
    } else {
      sorted.sort((a, b) => a.distance - b.distance);
    }

    return sorted;
  }, [enrichedQuakes, sortMode]);

  if (!quakes.length) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🔍</div>
        <h3>No earthquakes found</h3>
        <p>Try expanding your search radius or time window.</p>
      </div>
    );
  }

  return (
    <div className="quake-list">
      <div className="list-header">
        <h2>
          {quakes.length} earthquake{quakes.length !== 1 ? 's' : ''} found
        </h2>
        <div className="sort-controls">
          <span>Sort by:</span>
          <button
            className={`sort-button ${sortMode === 'time' ? 'active' : ''}`}
            onClick={() => setSortMode('time')}
            aria-pressed={sortMode === 'time'}
          >
            Most Recent
          </button>
          <button
            className={`sort-button ${sortMode === 'distance' ? 'active' : ''}`}
            onClick={() => setSortMode('distance')}
            aria-pressed={sortMode === 'distance'}
          >
            Nearest
          </button>
        </div>
      </div>

      <div className="cards-container">
        {sortedQuakes.map((quake) => (
          <QuakeCard
            key={quake.id}
            quake={quake}
            distance={quake.distance}
            isLikelyMatch={quake.isLikelyMatch}
            isSelected={quake.id === selectedQuakeId}
            onClick={() => onSelectQuake(quake)}
          />
        ))}
      </div>
    </div>
  );
}

export default QuakeList;
