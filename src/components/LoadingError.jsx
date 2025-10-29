import React from 'react';

function LoadingError({ loading, error, onRetry }) {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading seismic data</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        {onRetry && (
          <button onClick={onRetry} className="retry-button">
            Retry
          </button>
        )}
      </div>
    );
  }

  return null;
}

export default LoadingError;
