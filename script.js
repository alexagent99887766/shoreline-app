// Initialize the Leaflet map
const map = L.map('map').setView([59.5, 18.5], 9);

// Add OpenStreetMap baselayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 12,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Slider element and label
const slider = document.getElementById('yearSlider');
const yearLabel = document.getElementById('yearLabel');

// Current overlay layer reference
let currentOverlay = null;

// Function to build overlay URL for a given year
function getOverlayUrl(year) {
    return 'assets/overlays/landmask_' + year + '.png';
}

// Update overlay based on slider value
function updateOverlay(year) {
    yearLabel.textContent = year.toString();
    // Remove existing overlay
    if (currentOverlay) {
        map.removeLayer(currentOverlay);
        currentOverlay = null;
    }
    // Define bounds for the overlay: [southWestLat, southWestLng], [northEastLat, northEastLng]
    //
    // The landmask images represent a 1°×1° tile covering
    // latitude 59–60 ° N and longitude 18–19 ° E.  However,
    // inspection of the rendered overlay on the base map
    // suggested a slight north–south misalignment (about
    // 0.1° northward).  To compensate we shift both the
    // south‐west and north‐east corners south by 0.1°.
    // If further adjustment is required you can tweak the
    // values here (e.g. 0.05° or 0.2°) and redeploy.
    // Reset the bounds to match the original 1°×1° tile extents.
    // The landmask images cover latitude 59–60° N and longitude 18–19° E.
    // No southward shift is applied here.
    // Apply a slight southward shift (0.05°) to correct residual misalignment observed on the live map.
    // New extents: 58.95–59.95° N and 18–19° E
    const bounds = [[59.00, 18.0], [60.00, 19.0]];
    const url = getOverlayUrl(year);
    currentOverlay = L.imageOverlay(url, bounds, { opacity: 0.6 });
    currentOverlay.addTo(map);
}

// Event listener for the slider
slider.addEventListener('input', function () {
    let value = parseInt(slider.value, 10);
    // Snap to nearest 100-year step
    const step = Math.round(value / 100) * 100;
    slider.value = step;
    updateOverlay(step);
});

// Initialize with the present-day overlay
updateOverlay(0);
