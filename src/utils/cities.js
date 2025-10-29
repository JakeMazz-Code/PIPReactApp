// US Cities Database - Major cities and earthquake-prone locations
// Format: { name: "City Name", state: "ST", label: "City Name, ST" }

export const US_CITIES = [
  // Earthquake-prone cities (high priority)
  { name: "Anchorage", state: "AK", label: "Anchorage, AK", priority: 1 },
  { name: "Los Angeles", state: "CA", label: "Los Angeles, CA", priority: 1 },
  { name: "San Francisco", state: "CA", label: "San Francisco, CA", priority: 1 },
  { name: "Seattle", state: "WA", label: "Seattle, WA", priority: 1 },
  { name: "San Diego", state: "CA", label: "San Diego, CA", priority: 1 },
  { name: "Portland", state: "OR", label: "Portland, OR", priority: 1 },
  { name: "Honolulu", state: "HI", label: "Honolulu, HI", priority: 1 },
  { name: "Reno", state: "NV", label: "Reno, NV", priority: 1 },
  { name: "Las Vegas", state: "NV", label: "Las Vegas, NV", priority: 1 },

  // Major US cities
  { name: "New York", state: "NY", label: "New York, NY", priority: 2 },
  { name: "Chicago", state: "IL", label: "Chicago, IL", priority: 2 },
  { name: "Houston", state: "TX", label: "Houston, TX", priority: 2 },
  { name: "Phoenix", state: "AZ", label: "Phoenix, AZ", priority: 2 },
  { name: "Philadelphia", state: "PA", label: "Philadelphia, PA", priority: 2 },
  { name: "San Antonio", state: "TX", label: "San Antonio, TX", priority: 2 },
  { name: "Dallas", state: "TX", label: "Dallas, TX", priority: 2 },
  { name: "San Jose", state: "CA", label: "San Jose, CA", priority: 2 },
  { name: "Austin", state: "TX", label: "Austin, TX", priority: 2 },
  { name: "Jacksonville", state: "FL", label: "Jacksonville, FL", priority: 2 },
  { name: "Fort Worth", state: "TX", label: "Fort Worth, TX", priority: 2 },
  { name: "Columbus", state: "OH", label: "Columbus, OH", priority: 2 },
  { name: "Charlotte", state: "NC", label: "Charlotte, NC", priority: 2 },
  { name: "Indianapolis", state: "IN", label: "Indianapolis, IN", priority: 2 },
  { name: "Denver", state: "CO", label: "Denver, CO", priority: 2 },
  { name: "Washington", state: "DC", label: "Washington, DC", priority: 2 },
  { name: "Boston", state: "MA", label: "Boston, MA", priority: 2 },
  { name: "Nashville", state: "TN", label: "Nashville, TN", priority: 2 },
  { name: "Oklahoma City", state: "OK", label: "Oklahoma City, OK", priority: 2 },
  { name: "El Paso", state: "TX", label: "El Paso, TX", priority: 2 },
  { name: "Detroit", state: "MI", label: "Detroit, MI", priority: 2 },
  { name: "Memphis", state: "TN", label: "Memphis, TN", priority: 2 },
  { name: "Louisville", state: "KY", label: "Louisville, KY", priority: 2 },
  { name: "Baltimore", state: "MD", label: "Baltimore, MD", priority: 2 },
  { name: "Milwaukee", state: "WI", label: "Milwaukee, WI", priority: 2 },
  { name: "Albuquerque", state: "NM", label: "Albuquerque, NM", priority: 2 },
  { name: "Tucson", state: "AZ", label: "Tucson, AZ", priority: 2 },
  { name: "Fresno", state: "CA", label: "Fresno, CA", priority: 2 },
  { name: "Sacramento", state: "CA", label: "Sacramento, CA", priority: 2 },
  { name: "Mesa", state: "AZ", label: "Mesa, AZ", priority: 2 },
  { name: "Kansas City", state: "MO", label: "Kansas City, MO", priority: 2 },
  { name: "Atlanta", state: "GA", label: "Atlanta, GA", priority: 2 },
  { name: "Long Beach", state: "CA", label: "Long Beach, CA", priority: 2 },
  { name: "Colorado Springs", state: "CO", label: "Colorado Springs, CO", priority: 2 },
  { name: "Raleigh", state: "NC", label: "Raleigh, NC", priority: 2 },
  { name: "Miami", state: "FL", label: "Miami, FL", priority: 2 },
  { name: "Virginia Beach", state: "VA", label: "Virginia Beach, VA", priority: 2 },
  { name: "Omaha", state: "NE", label: "Omaha, NE", priority: 2 },
  { name: "Oakland", state: "CA", label: "Oakland, CA", priority: 2 },
  { name: "Minneapolis", state: "MN", label: "Minneapolis, MN", priority: 2 },
  { name: "Tulsa", state: "OK", label: "Tulsa, OK", priority: 2 },
  { name: "Tampa", state: "FL", label: "Tampa, FL", priority: 2 },
  { name: "Arlington", state: "TX", label: "Arlington, TX", priority: 2 },
  { name: "New Orleans", state: "LA", label: "New Orleans, LA", priority: 2 },

  // Additional cities
  { name: "Wichita", state: "KS", label: "Wichita, KS", priority: 3 },
  { name: "Cleveland", state: "OH", label: "Cleveland, OH", priority: 3 },
  { name: "Bakersfield", state: "CA", label: "Bakersfield, CA", priority: 3 },
  { name: "Aurora", state: "CO", label: "Aurora, CO", priority: 3 },
  { name: "Anaheim", state: "CA", label: "Anaheim, CA", priority: 3 },
  { name: "Honolulu", state: "HI", label: "Honolulu, HI", priority: 3 },
  { name: "Santa Ana", state: "CA", label: "Santa Ana, CA", priority: 3 },
  { name: "Riverside", state: "CA", label: "Riverside, CA", priority: 3 },
  { name: "Corpus Christi", state: "TX", label: "Corpus Christi, TX", priority: 3 },
  { name: "Lexington", state: "KY", label: "Lexington, KY", priority: 3 },
  { name: "Stockton", state: "CA", label: "Stockton, CA", priority: 3 },
  { name: "Henderson", state: "NV", label: "Henderson, NV", priority: 3 },
  { name: "Saint Paul", state: "MN", label: "Saint Paul, MN", priority: 3 },
  { name: "Cincinnati", state: "OH", label: "Cincinnati, OH", priority: 3 },
  { name: "Pittsburgh", state: "PA", label: "Pittsburgh, PA", priority: 3 },
  { name: "Greensboro", state: "NC", label: "Greensboro, NC", priority: 3 },
  { name: "Plano", state: "TX", label: "Plano, TX", priority: 3 },
  { name: "Lincoln", state: "NE", label: "Lincoln, NE", priority: 3 },
  { name: "Orlando", state: "FL", label: "Orlando, FL", priority: 3 },
  { name: "Irvine", state: "CA", label: "Irvine, CA", priority: 3 },
  { name: "Newark", state: "NJ", label: "Newark, NJ", priority: 3 },
  { name: "Durham", state: "NC", label: "Durham, NC", priority: 3 },
  { name: "Chula Vista", state: "CA", label: "Chula Vista, CA", priority: 3 },
  { name: "Toledo", state: "OH", label: "Toledo, OH", priority: 3 },
  { name: "Fort Wayne", state: "IN", label: "Fort Wayne, IN", priority: 3 },
  { name: "St Petersburg", state: "FL", label: "St Petersburg, FL", priority: 3 },
  { name: "Laredo", state: "TX", label: "Laredo, TX", priority: 3 },
  { name: "Jersey City", state: "NJ", label: "Jersey City, NJ", priority: 3 },
  { name: "Chandler", state: "AZ", label: "Chandler, AZ", priority: 3 },
  { name: "Madison", state: "WI", label: "Madison, WI", priority: 3 },
  { name: "Lubbock", state: "TX", label: "Lubbock, TX", priority: 3 },
  { name: "Scottsdale", state: "AZ", label: "Scottsdale, AZ", priority: 3 },
  { name: "Reno", state: "NV", label: "Reno, NV", priority: 3 },
  { name: "Buffalo", state: "NY", label: "Buffalo, NY", priority: 3 },
  { name: "Gilbert", state: "AZ", label: "Gilbert, AZ", priority: 3 },
  { name: "Glendale", state: "AZ", label: "Glendale, AZ", priority: 3 },
  { name: "North Las Vegas", state: "NV", label: "North Las Vegas, NV", priority: 3 },
  { name: "Winston-Salem", state: "NC", label: "Winston-Salem, NC", priority: 3 },
  { name: "Chesapeake", state: "VA", label: "Chesapeake, VA", priority: 3 },
  { name: "Norfolk", state: "VA", label: "Norfolk, VA", priority: 3 },
  { name: "Fremont", state: "CA", label: "Fremont, CA", priority: 3 },
  { name: "Garland", state: "TX", label: "Garland, TX", priority: 3 },
  { name: "Irving", state: "TX", label: "Irving, TX", priority: 3 },
  { name: "Hialeah", state: "FL", label: "Hialeah, FL", priority: 3 },
  { name: "Richmond", state: "VA", label: "Richmond, VA", priority: 3 },
  { name: "Boise", state: "ID", label: "Boise, ID", priority: 3 },
  { name: "Spokane", state: "WA", label: "Spokane, WA", priority: 3 },
  { name: "Baton Rouge", state: "LA", label: "Baton Rouge, LA", priority: 3 },
];

// Filter cities based on search input
export function filterCities(searchText, maxResults = 8) {
  if (!searchText || searchText.trim().length < 2) {
    return [];
  }

  const search = searchText.toLowerCase().trim();

  // Filter cities that match
  const matches = US_CITIES.filter(city => {
    const cityName = city.name.toLowerCase();
    const stateName = city.state.toLowerCase();
    const fullLabel = city.label.toLowerCase();

    // Match if search appears at start of city name (highest priority)
    // or anywhere in city name or state
    return cityName.startsWith(search) ||
           fullLabel.includes(search) ||
           stateName.startsWith(search);
  });

  // Sort by priority (earthquake cities first) and alphabetically
  matches.sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    }
    return a.label.localeCompare(b.label);
  });

  return matches.slice(0, maxResults);
}
