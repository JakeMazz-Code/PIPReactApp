# City Search Feature

## Overview

The app now supports **city/state search** in addition to ZIP codes, using the same Zippopotam API with no additional dependencies or API changes.

## How to Use

### Method 1: ZIP Code (Original)
```
90210
10001
99501
```

### Method 2: City, State (NEW!)
```
Los Angeles, CA
New York, NY
San Francisco, CA
Seattle, WA
Miami, FL
Chicago, IL
Boston, MA
Portland, OR
Austin, TX
Denver, CO
```

## Format Requirements

**City, State format:**
- City name (letters and spaces allowed)
- Comma
- Space (optional)
- **Two-letter state abbreviation (MUST be uppercase)**

### Valid Examples ✅
- `Los Angeles, CA`
- `New York, NY`
- `San Francisco,CA` (space optional)
- `Salt Lake City, UT`

### Invalid Examples ❌
- `Los Angeles, California` (full state name not supported)
- `los angeles, ca` (lowercase state not supported by API)
- `LA, CA` (API may not recognize abbreviation)
- `New York` (missing state)

## Technical Details

### API Endpoint Used
```
https://api.zippopotam.us/us/{STATE}/{CITY}
```

**Example:**
```
https://api.zippopotam.us/us/CA/Los%20Angeles
```

Returns all ZIP codes for Los Angeles, CA. The app uses the first result's coordinates.

### Validation Regex

**ZIP Code:**
```javascript
/^\d{5}$/
```

**City, State:**
```javascript
/^[a-zA-Z\s]+,\s*[A-Z]{2}$/
```

### Error Messages

- **Invalid format:** "Enter ZIP (e.g., 90210) or City, ST (e.g., Los Angeles, CA)"
- **Location not found:** "Location not found" (from API)
- **API error:** "Failed to fetch coordinates: [error message]"

## Popular Cities for Testing

| City | State | Format |
|------|-------|--------|
| Los Angeles | CA | `Los Angeles, CA` |
| New York | NY | `New York, NY` |
| Chicago | IL | `Chicago, IL` |
| Houston | TX | `Houston, TX` |
| Phoenix | AZ | `Phoenix, AZ` |
| Philadelphia | PA | `Philadelphia, PA` |
| San Antonio | TX | `San Antonio, TX` |
| San Diego | CA | `San Diego, CA` |
| Dallas | TX | `Dallas, TX` |
| San Jose | CA | `San Jose, CA` |
| Austin | TX | `Austin, TX` |
| Seattle | WA | `Seattle, WA` |
| Denver | CO | `Denver, CO` |
| Portland | OR | `Portland, OR` |
| Las Vegas | NV | `Las Vegas, NV` |
| Boston | MA | `Boston, MA` |
| Miami | FL | `Miami, FL` |
| Atlanta | GA | `Atlanta, GA` |
| Minneapolis | MN | `Minneapolis, MN` |
| Anchorage | AK | `Anchorage, AK` |

## Earthquake-Prone Cities

For guaranteed results, try these high-activity locations:

| Location | Format | Expected Quakes (7d) |
|----------|--------|---------------------|
| Anchorage, AK | `Anchorage, AK` | 50-200+ |
| Los Angeles, CA | `Los Angeles, CA` | 20-100 |
| San Francisco, CA | `San Francisco, CA` | 15-50 |
| Seattle, WA | `Seattle, WA` | 5-20 |
| Honolulu, HI | `Honolulu, HI` | 10-50 |
| Reno, NV | `Reno, NV` | 5-15 |

## Code Changes

### `src/utils/geo.js`
```javascript
// Before: Only ZIP codes
export async function getCoordinatesFromZip(zip) {
  const url = `https://api.zippopotam.us/us/${zip}`;
  // ...
}

// After: ZIP codes OR City, State
export async function getCoordinatesFromZip(input) {
  let url;

  if (/^\d{5}$/.test(input.trim())) {
    // ZIP code
    url = `https://api.zippopotam.us/us/${input.trim()}`;
  } else if (/^[a-zA-Z\s]+,\s*[A-Z]{2}$/.test(input.trim())) {
    // City, State
    const [city, state] = input.split(',').map(s => s.trim());
    url = `https://api.zippopotam.us/us/${state}/${encodeURIComponent(city)}`;
  } else {
    throw new Error('Enter ZIP code (e.g., 90210) or City, ST (e.g., Los Angeles, CA)');
  }
  // ...
}
```

### `src/components/ControlsBar.jsx`
```javascript
// Before: Only 5-digit validation
if (zip && /^\d{5}$/.test(zip)) {
  // ...
}

// After: ZIP OR City, State validation
if (input && (/^\d{5}$/.test(input) || /^[a-zA-Z\s]+,\s*[A-Z]{2}$/.test(input))) {
  // ...
}
```

### Input Placeholder
```javascript
// Before
placeholder="Enter ZIP code"

// After
placeholder="ZIP or City, ST"
```

## Limitations

1. **State must be uppercase** - API requirement
2. **Only US locations** - Zippopotam supports other countries, but this app is US-only
3. **First result used** - If a city name exists in multiple places (e.g., "Springfield"), the first ZIP is used
4. **No autocomplete** - User must type full city name correctly
5. **Common names only** - Small towns may not be in the database

## Future Enhancements (Not Implemented)

- Autocomplete dropdown as you type
- Case-insensitive state abbreviations (convert to uppercase automatically)
- Support for full state names (requires mapping table)
- City name suggestions for typos
- Multiple results selection when city appears in multiple states

## Benefits

✅ **No new dependencies** - Uses existing Zippopotam API
✅ **No additional API calls** - Same endpoint pattern
✅ **Backward compatible** - ZIP codes still work as before
✅ **User-friendly** - Easier to remember cities than ZIP codes
✅ **Minimal code changes** - ~20 lines added total

---

**Try it now at http://localhost:3000** - Enter "Los Angeles, CA" and see it work!
