import { milesToKm } from './geo';

const USGS_API_BASE = 'https://earthquake.usgs.gov/fdsnws/event/1/query';

// Build USGS API query URL
export function buildQuery({ latitude, longitude, windowHours = 24, radiusMi = 50, minMag = 0 }) {
  const now = new Date();
  const startTime = new Date(now.getTime() - windowHours * 60 * 60 * 1000);

  const params = new URLSearchParams({
    format: 'geojson',
    starttime: startTime.toISOString().split('.')[0],
    endtime: now.toISOString().split('.')[0],
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    maxradiuskm: milesToKm(radiusMi).toFixed(2),
    minmagnitude: minMag.toString(),
    orderby: 'time',
    limit: '200'
  });

  return `${USGS_API_BASE}?${params.toString()}`;
}

// Fetch earthquake data from USGS
export async function fetchEarthquakes({ latitude, longitude, windowHours, radiusMi, minMag }) {
  try {
    const url = buildQuery({ latitude, longitude, windowHours, radiusMi, minMag });
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`USGS API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.features || [];
  } catch (error) {
    throw new Error(`Failed to fetch earthquake data: ${error.message}`);
  }
}

// Get DYFI (Did You Feel It?) report URL
export function getDYFIUrl(eventId) {
  return `https://earthquake.usgs.gov/earthquakes/eventpage/${eventId}/tellus`;
}

// Get magnitude color (Anduril-inspired accent colors)
export function getMagnitudeColor(mag) {
  if (mag <= 2.5) return '#28C76F'; // accent-ok
  if (mag <= 4.0) return '#FFB020'; // accent-mid
  return '#FF7A00'; // accent-warn
}

// Get magnitude label
export function getMagnitudeLabel(mag) {
  if (mag <= 2.5) return 'Minor';
  if (mag <= 4.0) return 'Light';
  if (mag <= 5.0) return 'Moderate';
  if (mag <= 6.0) return 'Strong';
  return 'Major';
}
