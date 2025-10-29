// Haversine formula to calculate distance between two lat/lon points in miles
export function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 3959; // Earth's radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

function toRad(degrees) {
  return degrees * (Math.PI / 180);
}

// Convert miles to kilometers
export function milesToKm(miles) {
  return miles * 1.60934;
}

// Convert kilometers to miles
export function kmToMiles(km) {
  return km * 0.621371;
}

// Fetch coordinates from ZIP code using Zippopotam.us API
export async function getCoordinatesFromZip(zip) {
  try {
    const response = await fetch(`https://api.zippopotam.us/us/${zip}`);

    if (!response.ok) {
      throw new Error('Invalid ZIP code');
    }

    const data = await response.json();

    if (data.places && data.places.length > 0) {
      return {
        latitude: parseFloat(data.places[0].latitude),
        longitude: parseFloat(data.places[0].longitude),
        placeName: `${data.places[0]['place name']}, ${data.places[0]['state abbreviation']}`
      };
    }

    throw new Error('No location found for ZIP code');
  } catch (error) {
    throw new Error(`Failed to fetch coordinates: ${error.message}`);
  }
}

// Format time ago (e.g., "2h 14m ago")
export function formatTimeAgo(timestampMs) {
  const now = Date.now();
  const diffMs = now - timestampMs;
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  const remainingMinutes = diffMinutes % 60;

  if (diffHours < 24) {
    return `${diffHours}h ${remainingMinutes}m ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  const remainingHours = diffHours % 24;
  return `${diffDays}d ${remainingHours}h ago`;
}

// Calculate "likely match" score
export function calculateMatchScore(quake, userLat, userLon, nowMs) {
  const distance = haversineDistance(userLat, userLon, quake.geometry.coordinates[1], quake.geometry.coordinates[0]);
  const timeDiffMinutes = (nowMs - quake.properties.time) / (1000 * 60);
  const mag = quake.properties.mag || 0;

  // Normalize values for scoring
  const normalizedTime = Math.min(timeDiffMinutes / 90, 1); // 90 minutes as max
  const normalizedDistance = Math.min(distance / 100, 1); // 100 miles as max

  // Smaller score is better
  const score = 0.7 * normalizedTime + 0.3 * normalizedDistance - 0.1 * (mag / 6);

  return {
    score,
    distance,
    timeDiffMinutes,
    isLikelyMatch: timeDiffMinutes <= 90 && score < 0.5
  };
}
