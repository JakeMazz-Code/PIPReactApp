# ⚡ Quick Test (5 Minutes)

Your dev server is running at: **http://localhost:3000**

## 1️⃣ Visual Check (30 seconds)

Open http://localhost:3000 in your browser and verify:

```
✅ Black background (not white)
✅ White text "WAS THAT AN EARTHQUAKE? NEAR-ME"
✅ Controls bar with buttons visible
✅ "Use My Location" button
✅ ZIP code input field
✅ Filter controls (sliders)
✅ Welcome message in center
```

**Screenshot what you should see:**
```
┌─────────────────────────────────────────────────┐
│  WAS THAT AN EARTHQUAKE? NEAR-ME                │
│  Instantly check if there was a quake near you  │
├─────────────────────────────────────────────────┤
│  📍 Use My Location  [ ZIP ] [Go]   📌          │
│  TIME WINDOW: [24h ▼] RADIUS: [50 mi ——●——]    │
│  MIN MAG: [0.0 ——●——————————]  🔄 Refresh       │
├─────────────────────────────────────────────────┤
│                                                  │
│              Welcome!                            │
│   Click "Use My Location" or enter a ZIP code   │
│              to get started.                     │
│                                                  │
└─────────────────────────────────────────────────┘
```

**❌ If you see a blank white page → Check browser console (F12)**

---

## 2️⃣ Location Test (1 minute)

### Option A: Geolocation
1. Click **"📍 Use My Location"**
2. Browser asks for permission
3. Click **Allow**

**Expected:**
- Loading spinner appears
- Map loads (dark theme)
- Location name appears
- Earthquake data loads (if any nearby)

### Option B: ZIP Code (Recommended for testing)
1. Enter `90210` (Los Angeles - guaranteed earthquakes)
2. Click **Go**

**Expected:**
- Loading spinner
- Location shows "📌 Beverly Hills, CA"
- Dark map centers on LA
- Green/orange/red markers appear
- List shows earthquakes on right side

---

## 3️⃣ Map Test (1 minute)

**Check:**
- ✅ Map is DARK (not bright/white)
- ✅ Colored circle markers (green/orange/red)
- ✅ Legend in bottom-left corner
- ✅ Can zoom with mouse wheel
- ✅ Can pan by clicking and dragging

**Click a marker:**
- ✅ Popup appears with magnitude and location
- ✅ Corresponding card in list highlights

---

## 4️⃣ List Test (1 minute)

**Right side panel should show:**
- ✅ "X earthquakes found" header
- ✅ Sort buttons: "Most Recent" | "Nearest"
- ✅ Cards with earthquake info:
  - Colored magnitude badge (M 2.3)
  - Location (e.g., "5 km NE of Beverly Hills")
  - Time ago (e.g., "2h 14m ago")
  - Distance (e.g., "12.3 mi away")
  - Depth (e.g., "8.2 km")

**Click a card:**
- ✅ Card highlights (white border)
- ✅ Map zooms to that earthquake
- ✅ Marker popup opens

---

## 5️⃣ Filter Test (1 minute)

**Change time window:**
1. Click dropdown → Select "Last 48 hours"
2. Watch loading spinner
3. More earthquakes appear

**Adjust radius:**
1. Drag radius slider to 100 miles
2. Loading spinner
3. More earthquakes appear

**Try min magnitude:**
1. Drag magnitude slider to 2.5
2. Loading spinner
3. Fewer earthquakes (filters out small ones)

---

## 6️⃣ Link Test (30 seconds)

**Click "View on USGS →" on any card:**
- ✅ Opens USGS website in NEW tab
- ✅ Shows detailed earthquake info
- ✅ Original app tab still open

**Click "Did You Feel It? →":**
- ✅ Opens DYFI questionnaire in NEW tab
- ✅ Can submit a report (optional)

---

## 7️⃣ Console Check (30 seconds)

**Press F12 (or Cmd+Option+I on Mac) to open DevTools**

**Console tab should show:**
- ✅ No RED errors
- ⚠️ Yellow deprecation warnings are OK (React dev)
- ✅ No "Failed to fetch" errors
- ✅ No "404 Not Found" errors

**If you see errors:**
- Check your internet connection
- Refresh the page (Ctrl+R)
- Check TESTING_GUIDE.md for troubleshooting

---

## 8️⃣ Mobile Test (Optional - 1 minute)

**In DevTools (F12):**
1. Click device toolbar icon (📱) or press Ctrl+Shift+M
2. Select "iPhone SE" or "iPad"

**Expected:**
- ✅ Map appears on TOP
- ✅ List appears BELOW map
- ✅ Controls stack vertically
- ✅ Everything readable (no tiny text)

---

## ✅ Success Checklist

After 5 minutes, you should have verified:

- [ ] App loads with dark theme
- [ ] Location input works (geo or ZIP)
- [ ] Map displays with dark tiles
- [ ] Markers are colored circles
- [ ] Clicking marker opens popup
- [ ] List shows earthquake cards
- [ ] Clicking card syncs with map
- [ ] Filters trigger new data
- [ ] USGS links open in new tabs
- [ ] No console errors

**All checked? Your app is working perfectly! 🎉**

---

## ❌ Common First-Time Issues

### Issue: Blank page
**Fix:** Hard refresh (Ctrl+Shift+R)

### Issue: No earthquakes
**Fix:** Use ZIP `99501` (Alaska - very active)

### Issue: Map not showing
**Fix:**
1. Check internet (needs to load map tiles)
2. Check console for errors
3. Try different browser

### Issue: "Failed to fetch"
**Fix:**
1. Check internet connection
2. USGS API might be down (rare)
3. Try again in 30 seconds

---

## 🚀 Next Steps

**If all tests pass:**
1. Read [TESTING_GUIDE.md](./TESTING_GUIDE.md) for comprehensive testing
2. Test with different locations (LA, SF, Alaska, Hawaii)
3. Test on mobile device (not just DevTools)
4. Share with friends to get feedback

**If you found bugs:**
1. Note the steps to reproduce
2. Check browser console for errors
3. Check [TESTING_GUIDE.md](./TESTING_GUIDE.md) troubleshooting section

---

## 📊 Test Different Locations

**High earthquake activity (guaranteed results):**

| ZIP | Location | Expected Quakes (24h) |
|-----|----------|----------------------|
| 99501 | Anchorage, AK | 20-50+ |
| 96720 | Hilo, HI | 10-30 |
| 90210 | Beverly Hills, CA | 5-20 |
| 94102 | San Francisco, CA | 5-15 |
| 89001 | Nevada (test site) | 3-10 |

**Low activity (test empty state):**
| ZIP | Location | Expected Quakes |
|-----|----------|----------------|
| 67401 | Salina, KS | 0-2 |
| 58501 | Bismarck, ND | 0-1 |

---

## 🎨 Visual Design Check

**Your app should look:**
- Dark (not light theme)
- Minimal (no gradients, drop shadows)
- Monochrome (black/white/gray)
- Color ONLY on magnitude badges and markers
- Clean typography (Inter font)
- Subtle animations (180ms)

**Inspiration:** Anduril.com (sophisticated, mission-focused)

---

**Happy Testing! The app is running at http://localhost:3000** 🚀

**Stop server:** Press Ctrl+C in the terminal
