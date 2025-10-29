import React from 'react';
import { formatTimeAgo } from '../utils/geo';
import { getMagnitudeColor, getDYFIUrl } from '../utils/usgs';

function QuakeCard({ quake, distance, isLikelyMatch, isSelected, onClick }) {
  const { properties, geometry, id } = quake;
  const mag = properties.mag || 0;
  const depth = geometry.coordinates[2];
  const magColor = getMagnitudeColor(mag);

  return (
    <div
      className={`quake-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
      aria-label={`Earthquake magnitude ${mag.toFixed(1)} ${properties.place} ${formatTimeAgo(properties.time)}`}
    >
      {isLikelyMatch && (
        <div className="likely-match-badge" aria-label="Likely match based on time and distance">
          ⭐ Likely Match
        </div>
      )}

      <div className="quake-header">
        <span
          className="magnitude-badge"
          style={{ backgroundColor: magColor }}
          aria-label={`Magnitude ${mag.toFixed(1)}`}
        >
          M {mag.toFixed(1)}
        </span>
        <span className="quake-location">{properties.place}</span>
      </div>

      <div className="quake-details">
        <span className="detail-item">
          🕐 {formatTimeAgo(properties.time)}
        </span>
        <span className="detail-item">
          📏 {distance.toFixed(1)} mi away
        </span>
        <span className="detail-item">
          ⬇️ Depth: {depth.toFixed(1)} km
        </span>
      </div>

      {(properties.felt || properties.cdi || properties.mmi) && (
        <div className="quake-intensity">
          {properties.felt && (
            <span className="detail-item">
              👥 DYFI: {properties.felt} reports
            </span>
          )}
          {properties.cdi && (
            <span className="detail-item">
              📊 CDI: {properties.cdi.toFixed(1)}
            </span>
          )}
          {properties.mmi && (
            <span className="detail-item">
              📈 MMI: {properties.mmi.toFixed(1)}
            </span>
          )}
        </div>
      )}

      {properties.tsunami === 1 && (
        <div className="tsunami-warning" role="alert">
          🌊 Tsunami Warning
        </div>
      )}

      <div className="quake-actions">
        <a
          href={properties.url}
          target="_blank"
          rel="noopener noreferrer"
          className="action-link"
          onClick={(e) => e.stopPropagation()}
          aria-label="View detailed information on USGS website"
        >
          View on USGS →
        </a>
        <a
          href={getDYFIUrl(id)}
          target="_blank"
          rel="noopener noreferrer"
          className="action-link dyfi-link"
          onClick={(e) => e.stopPropagation()}
          aria-label="Report if you felt this earthquake"
        >
          Did You Feel It? →
        </a>
      </div>
    </div>
  );
}

export default QuakeCard;
