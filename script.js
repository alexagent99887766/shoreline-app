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
    const bounds = [[59.0, 18.0], [60.0, 19.0]];
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