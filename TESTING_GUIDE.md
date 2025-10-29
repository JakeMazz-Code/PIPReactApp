# Local Testing Guide

## Quick Start Testing

### 1. Start the Development Server

```bash
npm start
```

The app should automatically open at [http://localhost:3000](http://localhost:3000)

**Expected behavior**:
- ✅ App loads without errors
- ✅ Welcome message appears
- ✅ Controls bar visible at top
- ✅ No console errors in DevTools

---

## Step-by-Step Functional Testing

### Test 1: Geolocation (Preferred Method)

**Steps**:
1. Click the **"📍 Use My Location"** button
2. Browser prompts for location permission
3. Click **"Allow"**

**Expected Results**:
- ✅ Loading spinner appears
- ✅ Location name appears (e.g., "📌 Current Location")
- ✅ Map centers on your location
- ✅ Blue user marker appears on map
- ✅ Earthquake markers appear (if any in your area)
- ✅ List shows earthquakes (or empty state)

**Common Issues**:
- ❌ If permission denied → Should prompt for ZIP code
- ❌ If HTTPS required → Use Chrome's localhost exception

---

### Test 2: ZIP Code Entry

**Steps**:
1. Enter a ZIP code with known earthquake activity (try these):
   - `90210` - Los Angeles area (frequent quakes)
   - `94102` - San Francisco (frequent quakes)
   - `99501` - Anchorage, Alaska (very active)
2. Click **"Go"**

**Expected Results**:
- ✅ Loading spinner appears
- ✅ Location name shows (e.g., "📌 Beverly Hills, CA")
- ✅ Map centers on ZIP location
- ✅ Earthquake data loads
- ✅ Last ZIP saved (check localStorage in DevTools)

**Test Invalid ZIP**:
1. Enter `00000` or `abc12`
2. Click **"Go"**
3. Should show alert: "Please enter a valid 5-digit ZIP code"

---

### Test 3: Filter Controls

#### Time Window
**Steps**:
1. Select **"Last 24 hours"** (default)
2. Note number of quakes
3. Change to **"Last 48 hours"**
4. Note number increases (usually)
5. Change to **"Last 7 days"**
6. Should see even more quakes

**Expected**:
- ✅ Each change triggers new API fetch
- ✅ Loading spinner on each change
- ✅ Quake count updates
- ✅ Map markers update

#### Radius Slider
**Steps**:
1. Set to **10 miles** (minimum)
2. Note quake count (may be 0)
3. Increase to **50 miles**
4. Count should increase
5. Max out at **250 miles**
6. Count should be highest

**Expected**:
- ✅ Slider value updates in label
- ✅ New fetch on change
- ✅ More quakes with larger radius

#### Minimum Magnitude
**Steps**:
1. Set to **0.0** (default)
2. Note count (includes all small quakes)
3. Increase to **2.5**
4. Count decreases (filters out minor quakes)
5. Set to **4.0**
6. Very few or no quakes (rare)

**Expected**:
- ✅ Magnitude value shows (e.g., "0.5", "1.0")
- ✅ Fetches on change
- ✅ Only quakes >= threshold shown

---

### Test 4: Map Interaction

#### Markers
**Steps**:
1. Find a colored circle marker on map
2. Hover over it
3. Click the marker

**Expected**:
- ✅ Hover shows slight scale (1.05x)
- ✅ Click opens popup with:
  - Magnitude (e.g., "M 3.2")
  - Location (e.g., "5 km NE of Berkeley, CA")
  - Depth (e.g., "8.3 km")
  - Timestamp
- ✅ Corresponding card in list highlights
- ✅ List scrolls to show that card

#### Legend
**Expected**:
- ✅ Legend visible in bottom-left
- ✅ Shows three magnitude ranges:
  - Green: ≤ 2.5 Minor
  - Orange: 2.6 - 4.0 Light
  - Red: > 4.0 Moderate+

#### Zoom & Pan
**Steps**:
1. Use mouse wheel to zoom in/out
2. Click and drag to pan
3. Double-click to zoom in

**Expected**:
- ✅ All standard Leaflet controls work
- ✅ Map tiles load smoothly
- ✅ Dark CARTO basemap (not standard bright OSM)

---

### Test 5: Earthquake List

#### Sorting
**Steps**:
1. Default is **"Most Recent"**
2. Top card should be newest (smallest "time ago")
3. Click **"Nearest"**
4. Top card should be closest (smallest distance in miles)
5. Click back to **"Most Recent"**

**Expected**:
- ✅ Active button highlighted (white border)
- ✅ List re-sorts instantly
- ✅ No page reload

#### "Likely Match" Badge
**Steps**:
1. If any quake is within ~90 minutes and close by
2. Should see **"⭐ Likely Match"** badge on top card
3. Badge only appears on ONE card (best match)

**Expected**:
- ✅ Badge visible in top-right of card
- ✅ White outline, small text
- ✅ Only on most probable quake

---

### Test 6: Earthquake Cards

#### Card Content
**Check each card has**:
- ✅ Magnitude badge (colored: green/orange/red)
- ✅ Location text (e.g., "5 km NE of Berkeley")
- ✅ Time ago (e.g., "2h 14m ago")
- ✅ Distance (e.g., "12.3 mi away")
- ✅ Depth (e.g., "Depth: 8.2 km")

#### Optional Fields (if available)
- 👥 DYFI reports (e.g., "DYFI: 21 reports")
- 📊 CDI intensity (e.g., "CDI: 3.4")
- 📈 MMI intensity (e.g., "MMI: 3.8")
- 🌊 Tsunami warning (red bar if tsunami = 1)

#### Actions
**Steps**:
1. Click **"View on USGS →"**
2. Should open USGS event page in new tab
3. Go back, click **"Did You Feel It? →"**
4. Should open DYFI questionnaire in new tab

**Expected**:
- ✅ Links open in new tabs (don't leave app)
- ✅ Correct event ID in URL
- ✅ USGS pages load correctly

---

### Test 7: Empty States & Errors

#### No Quakes Found
**Steps**:
1. Set ZIP to middle of USA (e.g., `67401` - Salina, KS)
2. Set radius to **10 miles**
3. Set min magnitude to **4.0**
4. Likely no results

**Expected**:
- ✅ Empty state appears with magnifying glass icon
- ✅ Message: "No earthquakes found"
- ✅ Suggestion: "Try expanding your search radius or time window"

#### API Error (Simulate)
**Steps**:
1. Open DevTools → Network tab
2. Enable "Offline" mode
3. Change a filter to trigger fetch

**Expected**:
- ✅ Error message appears
- ✅ Orange warning icon
- ✅ Error text (e.g., "Failed to fetch")
- ✅ **"Retry"** button visible
4. Disable "Offline" mode
5. Click **"Retry"**
6. Should successfully fetch

---

### Test 8: Responsive Design

#### Desktop (1920×1080)
**Check**:
- ✅ Map on left, list on right (side-by-side)
- ✅ Controls fit in one row
- ✅ Everything readable

#### Tablet (Open DevTools → Toggle Device Toolbar)
**Set to iPad (768×1024)**:
- ✅ Layout stacks: Map top, List bottom
- ✅ Map height ~400px
- ✅ Controls may wrap to 2 rows
- ✅ Touch-friendly

#### Mobile (iPhone SE - 375×667)
**Check**:
- ✅ Map height ~300px
- ✅ List below map
- ✅ Controls stack vertically
- ✅ Sliders full width
- ✅ Text readable (no tiny fonts)
- ✅ Buttons large enough to tap

---

### Test 9: Performance

#### Network Tab (DevTools)
**Check**:
1. Open DevTools → Network tab
2. Trigger a new fetch (change filter)
3. Look for:
   - ✅ USGS API call (`earthquake.usgs.gov`)
   - ✅ CARTO map tiles loading
   - ✅ Response time < 2 seconds
   - ✅ No failed requests (404, 500)

#### Console Tab
**Check**:
- ✅ No red errors
- ⚠️ Yellow warnings OK (React dev warnings)
- ✅ No infinite loops (would freeze browser)

#### Memory (Repeat Operations)
**Steps**:
1. Change filters 10 times rapidly
2. Click different cards 20 times
3. Switch sort modes 10 times

**Expected**:
- ✅ App stays responsive
- ✅ No memory leaks (check DevTools Memory)
- ✅ No crashes

---

### Test 10: Accessibility

#### Keyboard Navigation
**Steps** (without using mouse):
1. Press **Tab** to move through controls
2. Press **Enter** on "Use My Location"
3. Tab through filter controls
4. Tab to cards in list
5. Press **Enter** or **Space** on a card

**Expected**:
- ✅ Focus visible (outline appears)
- ✅ Logical tab order (top to bottom, left to right)
- ✅ Enter/Space activates buttons
- ✅ Can navigate entire app via keyboard

#### Screen Reader (Optional)
**Steps** (Windows: Narrator, Mac: VoiceOver):
1. Enable screen reader
2. Navigate through app
3. Listen to announcements

**Expected**:
- ✅ Controls have labels
- ✅ Map has role="application"
- ✅ Cards describe earthquake info
- ✅ Loading states announced

---

## Browser Testing Checklist

### Chrome/Edge
- [ ] Open in Chrome
- [ ] DevTools → Console (check for errors)
- [ ] All features work
- [ ] Geolocation prompts correctly

### Firefox
- [ ] Open in Firefox
- [ ] Check console
- [ ] Map renders correctly
- [ ] All features work

### Safari (Mac only)
- [ ] Open in Safari
- [ ] Check console
- [ ] Map and markers display
- [ ] Geolocation works

---

## Quick Smoke Test (5 Minutes)

If short on time, run this minimal test:

1. ✅ `npm start` → App loads
2. ✅ Enter ZIP `90210` → Map shows LA
3. ✅ See earthquake markers (green/orange/red circles)
4. ✅ Click a marker → Popup opens
5. ✅ Click a card → Map syncs
6. ✅ Change time window to 48h → More quakes
7. ✅ Click "View on USGS" → Opens in new tab
8. ✅ No console errors

**If all ✅ = App is working!**

---

## Common Issues & Solutions

### Issue: "Module not found" errors
**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

### Issue: Map doesn't show (blank white area)
**Solution**:
- Check console for Leaflet CSS errors
- Verify internet connection (needs to load tiles)
- Try hard refresh: Ctrl+Shift+R (Cmd+Shift+R on Mac)

### Issue: Geolocation denied
**Solution**:
- Use ZIP code instead
- Check browser settings (chrome://settings/content/location)
- Try incognito mode

### Issue: No earthquakes showing
**Solution**:
- Try a different location (LA, SF, Alaska)
- Increase radius to 100-250 miles
- Increase time window to 7 days
- Lower min magnitude to 0.0

### Issue: Blank page, no errors
**Solution**:
```bash
npm run build
serve -s build
```
Test production build at http://localhost:3000

### Issue: Slow performance
**Solution**:
- Reduce radius (less markers)
- Close other browser tabs
- Check network speed (API calls)

---

## Testing with Real Data

### High Activity Locations (Guaranteed Results)

**Alaska** (most active US state):
- ZIP: `99501` (Anchorage)
- Radius: 250 miles
- Time: 7 days
- Expect: 50-200+ quakes

**California**:
- ZIP: `90210` (LA)
- ZIP: `94102` (SF)
- Radius: 100 miles
- Time: 48 hours
- Expect: 10-50 quakes

**Nevada** (testing site activity):
- ZIP: `89001` (near Nevada Test Site)
- Radius: 100 miles
- Time: 24 hours
- Expect: 5-20 quakes

**Hawaii**:
- ZIP: `96720` (Hilo)
- Radius: 100 miles
- Time: 7 days
- Expect: 20-100+ quakes (Kilauea volcano)

---

## Production Build Testing

Before deploying, test the production build:

```bash
# Build
npm run build

# Serve locally
npx serve -s build

# Or install serve globally
npm install -g serve
serve -s build
```

**Test at http://localhost:3000**:
- [ ] All features work
- [ ] No console errors
- [ ] Map tiles load
- [ ] Faster than dev mode
- [ ] Minified code (check Network tab)

---

## Automated Testing (Future Enhancement)

Currently all testing is manual. To add automated tests:

```bash
# Jest + React Testing Library (included)
npm test

# Example test to add to src/App.test.js:
test('renders earthquake app', () => {
  render(<App />);
  const titleElement = screen.getByText(/Was That an Earthquake/i);
  expect(titleElement).toBeInTheDocument();
});
```

---

## Sign-Off Checklist

Before considering testing complete:

- [ ] Geolocation works (or ZIP fallback)
- [ ] All filters change data
- [ ] Map displays with dark theme
- [ ] Markers clickable
- [ ] List sortable
- [ ] Cards have all info
- [ ] Links open in new tabs
- [ ] Empty state shows when no quakes
- [ ] Error state shows on failure
- [ ] Retry button works
- [ ] Responsive on mobile
- [ ] Keyboard navigation works
- [ ] No console errors
- [ ] Production build works

**All checked? You're ready to deploy! 🚀**

---

## Need Help?

- Check browser console for errors
- Review [README.md](./README.md) for API details
- Check [ARCHITECTURE.md](./ARCHITECTURE.md) for data flow
- Verify API status: https://earthquake.usgs.gov/fdsnws/event/1/

**Happy Testing!**
